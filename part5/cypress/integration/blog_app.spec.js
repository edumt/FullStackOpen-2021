describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "test",
      name: "test",
      password: "test",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();

      cy.contains("test logged-in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("asdf");
      cy.get("#password").type("asdf");
      cy.get("#login-button").click();

      cy.contains("wrong username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "test",
        name: "test",
        password: "test",
      }).then((response) => {
        localStorage.setItem(
          "loggedBlogappUser",
          JSON.stringify(response.body),
        );
        cy.visit("http://localhost:3000");
      });
    });

    it.only("A blog can be created and be liked", function () {
      const sampleBlog = {
        title: "Testing blog",
        author: "Cypress",
        url: "localhost:3000",
      };
      cy.contains("new blog").click();
      cy.get("#blog-title").type(sampleBlog.title);
      cy.get("#blog-author").type(sampleBlog.author);
      cy.get("#blog-url").type(sampleBlog.url);
      cy.get("#createBlog-button").click();

      cy.contains(
        `a new blog '${sampleBlog.title}' by '${sampleBlog.author}' added`,
      );
      cy.contains(`${sampleBlog.title} | ${sampleBlog.author}`)
        .contains("view")
        .click();

      cy.contains("likes 0");
      cy.contains("like").click();
      cy.contains("likes 1");
    });
  });
});
