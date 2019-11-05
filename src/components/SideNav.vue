<template lang="pug">
  nav#sidebar
    .sidebar-header
      h3 Sidebar
    ul.list-unstyled.components
      li.active
        a(href='#') Home
      li
        a(href='#').text-white About
</template>

<style lang="scss">
  .navbar {
    padding: 15px 10px;
    background: #fff;
    border: none;
    border-radius: 0;
    margin-bottom: 40px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  }

  .navbar-btn {
    box-shadow: none;
    outline: none !important;
    border: none;
  }

  .line {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #ddd;
    margin: 40px 0;
  }

  /* ---------------------------------------------------
      SIDEBAR STYLE
  ----------------------------------------------------- */

  .wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
    min-height: 100vh;
  }

  #sidebar {
    min-width: 250px;
    max-width: 250px;
    background: #7386D5;
    color: #fff;
    transition: all 0.3s;

    &.active {
      margin-left: -250px;
    }

    .sidebar-header {
      padding: 20px;
      background: #6d7fcc;
    }

    ul {
      &.components {
        padding: 20px 0;
        border-bottom: 1px solid #47748b;
      }

      p {
        color: #fff;
        padding: 10px;
      }

      li {
        a {
          padding: 10px;
          font-size: 1.1em;
          display: block;

          &:hover {
            color: #7386D5;
          }
        }

        &.active > a {
          color: #fff;
          background: #6d7fcc;
        }
      }
    }
  }

  a {
    &[aria-expanded="true"] {
      color: #fff;
      background: #6d7fcc;
    }

    &[data-toggle="collapse"] {
      position: relative;
    }
  }

  .dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }

  ul {
    ul a {
      font-size: 0.9em !important;
      padding-left: 30px !important;
      background: #6d7fcc;
    }

    &.CTAs {
      padding: 20px;

      a {
        text-align: center;
        font-size: 0.9em !important;
        display: block;
        border-radius: 5px;
        margin-bottom: 5px;
      }
    }
  }

  a {
    &.download {
      background: #fff;
      color: #7386D5;
    }

    &.article {
      background: #6d7fcc !important;
      color: #fff !important;

      &:hover {
        background: #6d7fcc !important;
        color: #fff !important;
      }
    }
  }

  /* ---------------------------------------------------
      CONTENT STYLE
  ----------------------------------------------------- */

  #content {
    width: 100%;
    padding: 20px;
    min-height: 100vh;
    transition: all 0.3s;
  }

  /* ---------------------------------------------------
      MEDIAQUERIES
  ----------------------------------------------------- */

  @media (max-width: 768px) {
    #sidebar {
      margin-left: -250px;

      &.active {
        margin-left: 0;
      }
    }

    #sidebarCollapse span {
      display: none;
    }
  }
</style>
