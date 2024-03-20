import "./app-assets/css/core/menu/menu-types/vertical-menu-modern.css";
import avatar1 from "./app-assets/images/portrait/small/avatar-s-1.png";
import avatar5 from "./app-assets/images/portrait/small/avatar-s-14.png";
import avatar6 from "./app-assets/images/portrait/small/avatar-s-15.png";
import avatar7 from "./app-assets/images/portrait/small/avatar-s-4.png";
import avatar8 from "./app-assets/images/portrait/small/avatar-s-11.png";
import avatar9 from "./app-assets/images/portrait/small/avatar-s-19.png";
import avatar10 from "./app-assets/images/portrait/small/avatar-s-20.png";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      {/* <!-- BEGIN: Header--> */}
      <Header />
      {/* <!-- END: Header--> */}

      {/* <!-- BEGIN: Main Menu--> */}
      <div
        className="main-menu menu-fixed menu-dark menu-accordion menu-shadow"
        data-scroll-to-active="true"
      >
        <div className="main-menu-content">
          <ul
            className="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"
          >
            <li className=" navigation-header">
              <span>General</span>
              <i
                className=" feather icon-minus"
                data-toggle="tooltip"
                data-placement="right"
                data-original-title="General"
              ></i>
            </li>
            <li className=" nav-item">
              <a href="index.html">
                <i className="feather icon-home"></i>
                <span className="menu-title" data-i18n="Dashboard">
                  Dashboard
                </span>
                <span className="badge badge badge-primary badge-pill float-right mr-2">
                  3
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="dashboard-ecommerce.html"
                    data-i18n="eCommerce"
                  >
                    eCommerce
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="dashboard-analytics.html"
                    data-i18n="Analytics"
                  >
                    Analytics
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="dashboard-fitness.html"
                    data-i18n="Fitness"
                  >
                    Fitness
                  </a>
                </li>
                <li className="active">
                  <a
                    className="menu-item"
                    href="dashboard-crm.html"
                    data-i18n="CRM"
                  >
                    CRM
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-monitor"></i>
                <span className="menu-title" data-i18n="Templates">
                  Templates
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a className="menu-item" href="#" data-i18n="Vertical">
                    Vertical
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="../vertical-modern-menu-template"
                        data-i18n="Modern Menu"
                      >
                        Modern Menu
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="../vertical-collapsed-menu-template"
                        data-i18n="Collapsed Menu"
                      >
                        Collapsed Menu
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="../vertical-menu-template"
                        data-i18n="Semi Light"
                      >
                        Semi Light
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="../vertical-menu-template-semi-dark"
                        data-i18n="Semi Dark"
                      >
                        Semi Dark
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="../vertical-menu-template-nav-dark"
                        data-i18n="Nav Dark"
                      >
                        Nav Dark
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="../vertical-menu-template-light"
                        data-i18n="Light"
                      >
                        Light
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="../vertical-overlay-menu-template"
                        data-i18n="Overlay Menu"
                      >
                        Overlay Menu
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="menu-item" href="#" data-i18n="Horizontal">
                    Horizontal
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="../horizontal-menu-template"
                        data-i18n="Classic"
                      >
                        Classic
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="../horizontal-menu-template-nav"
                        data-i18n="Nav Dark"
                      >
                        Nav Dark
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-layout"></i>
                <span className="menu-title" data-i18n="Layouts">
                  Layouts
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a className="menu-item" href="#" data-i18n="Page Layouts">
                    Page Layouts
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="layout-1-column.html"
                        data-i18n="1 column"
                      >
                        1 column
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="layout-2-columns.html"
                        data-i18n="2 columns"
                      >
                        2 columns
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="#"
                        data-i18n="Content Det Sidebar"
                      >
                        Content Det Sidebar
                      </a>
                      <ul className="menu-content">
                        <li>
                          <a
                            className="menu-item"
                            href="layout-content-detached-left-sidebar.html"
                            data-i18n="Detached left sidebar"
                          >
                            Detached left sidebar
                          </a>
                        </li>
                        <li>
                          <a
                            className="menu-item"
                            href="layout-content-detached-left-sticky-sidebar.html"
                            data-i18n="Detached sticky left sidebar"
                          >
                            Detached sticky left sidebar
                          </a>
                        </li>
                        <li>
                          <a
                            className="menu-item"
                            href="layout-content-detached-right-sidebar.html"
                            data-i18n="Detached right sidebar"
                          >
                            Detached right sidebar
                          </a>
                        </li>
                        <li>
                          <a
                            className="menu-item"
                            href="layout-content-detached-right-sticky-sidebar.html"
                            data-i18n="Detached sticky right sidebar"
                          >
                            Detached sticky right sidebar
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="navigation-divider"></li>
                    <li>
                      <a
                        className="menu-item"
                        href="layout-fixed-navbar.html"
                        data-i18n="Fixed navbar"
                      >
                        Fixed navbar
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="layout-fixed-navigation.html"
                        data-i18n="Fixed navigation"
                      >
                        Fixed navigation
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="layout-fixed-navbar-navigation.html"
                        data-i18n="Fixed navbar &amp; navigation"
                      >
                        Fixed navbar &amp; navigation
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="layout-fixed-navbar-footer.html"
                        data-i18n="Fixed navbar &amp; footer"
                      >
                        Fixed navbar &amp; footer
                      </a>
                    </li>
                    <li className="navigation-divider"></li>
                    <li>
                      <a
                        className="menu-item"
                        href="layout-fixed.html"
                        data-i18n="Fixed layout"
                      >
                        Fixed layout
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="layout-boxed.html"
                        data-i18n="Boxed layout"
                      >
                        Boxed layout
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="layout-static.html"
                        data-i18n="Static layout"
                      >
                        Static layout
                      </a>
                    </li>
                    <li className="navigation-divider"></li>
                    <li>
                      <a
                        className="menu-item"
                        href="layout-light.html"
                        data-i18n="Light layout"
                      >
                        Light layout
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="layout-dark.html"
                        data-i18n="Dark layout"
                      >
                        Dark layout
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="layout-semi-dark.html"
                        data-i18n="Semi dark layout"
                      >
                        Semi dark layout
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="menu-item" href="#" data-i18n="Navbars">
                    Navbars
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="navbar-light.html"
                        data-i18n="Navbar Light"
                      >
                        Navbar Light
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="navbar-dark.html"
                        data-i18n="Navbar Dark"
                      >
                        Navbar Dark
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="navbar-semi-dark.html"
                        data-i18n="Navbar Semi Dark"
                      >
                        Navbar Semi Dark
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="navbar-brand-center.html"
                        data-i18n="Brand Center"
                      >
                        Brand Center
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="navbar-fixed-top.html"
                        data-i18n="Fixed Top"
                      >
                        Fixed Top
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="#"
                        data-i18n="Hide on Scroll"
                      >
                        Hide on Scroll
                      </a>
                      <ul className="menu-content">
                        <li>
                          <a
                            className="menu-item"
                            href="navbar-hide-on-scroll-top.html"
                            data-i18n="Hide on Scroll Top"
                          >
                            Hide on Scroll Top
                          </a>
                        </li>
                        <li>
                          <a
                            className="menu-item"
                            href="navbar-hide-on-scroll-bottom.html"
                            data-i18n="Hide on Scroll Bottom"
                          >
                            Hide on Scroll Bottom
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="navbar-components.html"
                        data-i18n="Navbar Components"
                      >
                        Navbar Components
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="navbar-styling.html"
                        data-i18n="Navbar Styling"
                      >
                        Navbar Styling
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="menu-item" href="#" data-i18n="Vertical Nav">
                    Vertical Nav
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="#"
                        data-i18n="Navigation Types"
                      >
                        Navigation Types
                      </a>
                      <ul className="menu-content">
                        <li>
                          <a
                            className="menu-item"
                            href="../vertical-menu-template"
                            data-i18n="Vertical Menu"
                          >
                            Vertical Menu
                          </a>
                        </li>
                        <li>
                          <a
                            className="menu-item"
                            href="../vertical-overlay-menu-template"
                            data-i18n="Vertical Overlay"
                          >
                            Vertical Overlay
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="vertical-nav-compact-menu.html"
                        data-i18n="Compact Menu"
                      >
                        Compact Menu
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="vertical-nav-fixed.html"
                        data-i18n="Fixed Navigation"
                      >
                        Fixed Navigation
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="vertical-nav-static.html"
                        data-i18n="Static Navigation"
                      >
                        Static Navigation
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="vertical-nav-light.html"
                        data-i18n="Navigation Light"
                      >
                        Navigation Light
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="vertical-nav-dark.html"
                        data-i18n="Navigation Dark"
                      >
                        Navigation Dark
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="vertical-nav-accordion.html"
                        data-i18n="Accordion Navigation"
                      >
                        Accordion Navigation
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="vertical-nav-collapsible.html"
                        data-i18n="Collapsible Navigation"
                      >
                        Collapsible Navigation
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="vertical-nav-flipped.html"
                        data-i18n="Flipped Navigation"
                      >
                        Flipped Navigation
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="vertical-nav-native-scroll.html"
                        data-i18n="Native scroll"
                      >
                        Native scroll
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="vertical-nav-right-side-icon.html"
                        data-i18n="Right side icons"
                      >
                        Right side icons
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="vertical-nav-bordered.html"
                        data-i18n="Bordered Navigation"
                      >
                        Bordered Navigation
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="vertical-nav-disabled-link.html"
                        data-i18n="Disabled Navigation"
                      >
                        Disabled Navigation
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="vertical-nav-styling.html"
                        data-i18n="Navigation Styling"
                      >
                        Navigation Styling
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="vertical-nav-tags-pills.html"
                        data-i18n="Tags &amp; Pills"
                      >
                        Tags &amp; Pills
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="menu-item" href="#" data-i18n="Horizontal Nav">
                    Horizontal Nav
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="#"
                        data-i18n="Navigation Types"
                      >
                        Navigation Types
                      </a>
                      <ul className="menu-content">
                        <li>
                          <a
                            className="menu-item"
                            href="../horizontal-menu-template"
                            data-i18n="Classic"
                          >
                            Classic
                          </a>
                        </li>
                        <li>
                          <a
                            className="menu-item"
                            href="../horizontal-menu-template-nav"
                            data-i18n="Nav Dark"
                          >
                            Nav Dark
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="menu-item" href="#" data-i18n="Page Headers">
                    Page Headers
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="headers-breadcrumbs-basic.html"
                        data-i18n="Breadcrumbs basic"
                      >
                        Breadcrumbs basic
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="headers-breadcrumbs-top.html"
                        data-i18n="Breadcrumbs top"
                      >
                        Breadcrumbs top
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="headers-breadcrumbs-bottom.html"
                        data-i18n="Breadcrumbs bottom"
                      >
                        Breadcrumbs bottom
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="headers-breadcrumbs-with-button.html"
                        data-i18n="Breadcrumbs with button"
                      >
                        Breadcrumbs with button
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="headers-breadcrumbs-with-round-button.html"
                        data-i18n="Breadcrumbs with round button 2"
                      >
                        Breadcrumbs with round button 2
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="headers-breadcrumbs-with-stats.html"
                        data-i18n="Breadcrumbs with stats"
                      >
                        Breadcrumbs with stats
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="menu-item" href="#" data-i18n="Footers">
                    Footers
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="footer-light.html"
                        data-i18n="Footer Light"
                      >
                        Footer Light
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="footer-dark.html"
                        data-i18n="Footer Dark"
                      >
                        Footer Dark
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="footer-transparent.html"
                        data-i18n="Footer Transparent"
                      >
                        Footer Transparent
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="footer-fixed.html"
                        data-i18n="Footer Fixed"
                      >
                        Footer Fixed
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="footer-components.html"
                        data-i18n="Footer Components"
                      >
                        Footer Components
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-zap"></i>
                <span className="menu-title" data-i18n="Starter kit">
                  Starter kit
                </span>
                <span className="badge badge badge-danger badge-pill float-right mr-2">
                  New
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="../../../starter-kit/ltr/vertical-modern-menu-template/layout-1-column.html"
                    data-i18n="1 column"
                  >
                    1 column
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="../../../starter-kit/ltr/vertical-modern-menu-template/layout-2-columns.html"
                    data-i18n="2 columns"
                  >
                    2 columns
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="#"
                    data-i18n="Content Det Sidebar"
                  >
                    Content Det Sidebar
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="../../../starter-kit/ltr/vertical-modern-menu-template/layout-content-detached-left-sidebar.html"
                        data-i18n="Detached left sidebar"
                      >
                        Detached left sidebar
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="../../../starter-kit/ltr/vertical-modern-menu-template/layout-content-detached-left-sticky-sidebar.html"
                        data-i18n="Detached sticky left sidebar"
                      >
                        Detached sticky left sidebar
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="../../../starter-kit/ltr/vertical-modern-menu-template/layout-content-detached-right-sidebar.html"
                        data-i18n="Detached right sidebar"
                      >
                        Detached right sidebar
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="../../../starter-kit/ltr/vertical-modern-menu-template/layout-content-detached-right-sticky-sidebar.html"
                        data-i18n="Detached sticky right sidebar"
                      >
                        Detached sticky right sidebar
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="navigation-divider"></li>
                <li>
                  <a
                    className="menu-item"
                    href="../../../starter-kit/ltr/vertical-modern-menu-template/layout-fixed-navbar.html"
                    data-i18n="Fixed navbar"
                  >
                    Fixed navbar
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="../../../starter-kit/ltr/vertical-modern-menu-template/layout-fixed-navigation.html"
                    data-i18n="Fixed navigation"
                  >
                    Fixed navigation
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="../../../starter-kit/ltr/vertical-modern-menu-template/layout-fixed-navbar-navigation.html"
                    data-i18n="Fixed navbar &amp; navigation"
                  >
                    Fixed navbar &amp; navigation
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="../../../starter-kit/ltr/vertical-modern-menu-template/layout-fixed-navbar-footer.html"
                    data-i18n="Fixed navbar &amp; footer"
                  >
                    Fixed navbar &amp; footer
                  </a>
                </li>
                <li className="navigation-divider"></li>
                <li>
                  <a
                    className="menu-item"
                    href="../../../starter-kit/ltr/vertical-modern-menu-template/layout-fixed.html"
                    data-i18n="Fixed layout"
                  >
                    Fixed layout
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="../../../starter-kit/ltr/vertical-modern-menu-template/layout-boxed.html"
                    data-i18n="Boxed layout"
                  >
                    Boxed layout
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="../../../starter-kit/ltr/vertical-modern-menu-template/layout-static.html"
                    data-i18n="Static layout"
                  >
                    Static layout
                  </a>
                </li>
                <li className="navigation-divider"></li>
                <li>
                  <a
                    className="menu-item"
                    href="../../../starter-kit/ltr/vertical-modern-menu-template/layout-light.html"
                    data-i18n="Light layout"
                  >
                    Light layout
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="../../../starter-kit/ltr/vertical-modern-menu-template/layout-dark.html"
                    data-i18n="Dark layout"
                  >
                    Dark layout
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="../../../starter-kit/ltr/vertical-modern-menu-template/layout-semi-dark.html"
                    data-i18n="Semi dark layout"
                  >
                    Semi dark layout
                  </a>
                </li>
              </ul>
            </li>
            <li className=" navigation-header">
              <span>Apps</span>
              <i
                className=" feather icon-minus"
                data-toggle="tooltip"
                data-placement="right"
                data-original-title="Apps"
              ></i>
            </li>
            <li className=" nav-item">
              <a href="app-email.html">
                <i className="feather icon-mail"></i>
                <span className="menu-title" data-i18n="Email Application">
                  Email Application
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="app-chat.html">
                <i className="feather icon-message-square"></i>
                <span className="menu-title" data-i18n="Chat Application">
                  Chat Application
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="app-todo.html">
                <i className="feather icon-check-square"></i>
                <span className="menu-title" data-i18n="Todo Application">
                  Todo Application
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="app-kanban.html">
                <i className="feather icon-file-plus"></i>
                <span className="menu-title" data-i18n="Kanban Application">
                  Kanban Application
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="app-contacts.html">
                <i className="feather icon-users"></i>
                <span className="menu-title" data-i18n="Contacts">
                  Contacts
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="project-summary.html">
                <i className="feather icon-airplay"></i>
                <span className="menu-title" data-i18n="Project Summary">
                  Project Summary
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-file-text"></i>
                <span className="menu-title" data-i18n="Invoice">
                  Invoice
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="invoice-list.html"
                    data-i18n="Invoice List"
                  >
                    Invoice List
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="invoice-view.html"
                    data-i18n="Invoice View"
                  >
                    Invoice View
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="invoice-edit.html"
                    data-i18n="Invoice Edit"
                  >
                    invoice Edit
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="invoice-add.html"
                    data-i18n="Invoice Add"
                  >
                    invoice Add
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-plus-square"></i>
                <span className="menu-title" data-i18n="Calender">
                  Calender
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="full-calender-basic.html"
                    data-i18n="Full Calender Basic"
                  >
                    Full Calender Basic
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="full-calender-events.html"
                    data-i18n="Full Calender Events"
                  >
                    Full Calender Events
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="full-calender-advance.html"
                    data-i18n="Full Calender Advance"
                  >
                    Full Calender Advance
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="full-calender-extra.html"
                    data-i18n="Full Calender Extra"
                  >
                    Full Calender Extra
                  </a>
                </li>
              </ul>
            </li>
            <li className=" navigation-header">
              <span>Pages</span>
              <i
                className=" feather icon-minus"
                data-toggle="tooltip"
                data-placement="right"
                data-original-title="Pages"
              ></i>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-share"></i>
                <span className="menu-title" data-i18n="Timelines">
                  Timelines
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="timeline-center.html"
                    data-i18n="Timelines Center"
                  >
                    Timelines Center
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="timeline-horizontal.html"
                    data-i18n="Timelines Horizontal"
                  >
                    Timelines Horizontal
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="account-setting.html">
                <i className="feather icon-user-plus"></i>
                <span className="menu-title" data-i18n="Account setting">
                  Account setting
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-user"></i>
                <span className="menu-title" data-i18n="Users">
                  Users
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="page-users-list.html"
                    data-i18n="Users List"
                  >
                    Users List
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="page-users-view.html"
                    data-i18n="Users View"
                  >
                    Users View
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="page-users-edit.html"
                    data-i18n="Users Edit"
                  >
                    Users Edit
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="user-profile.html"
                    data-i18n="Users Profile"
                  >
                    Users Profile
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="user-cards.html"
                    data-i18n="Users Cards"
                  >
                    Users Cards
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-image"></i>
                <span className="menu-title" data-i18n="Gallery">
                  Gallery
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="gallery-grid.html"
                    data-i18n="Gallery Grid"
                  >
                    Gallery Grid
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="gallery-grid-with-desc.html"
                    data-i18n="Gallery Grid with Desc"
                  >
                    Gallery Grid with Desc
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="gallery-masonry.html"
                    data-i18n="Masonry Gallery"
                  >
                    Masonry Gallery
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="gallery-masonry-with-desc.html"
                    data-i18n="Masonry Gallery with Desc"
                  >
                    Masonry Gallery with Desc
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="gallery-hover-effects.html"
                    data-i18n="Hover Effects"
                  >
                    Hover Effects
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-search"></i>
                <span className="menu-title" data-i18n="Search">
                  Search
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="search-page.html"
                    data-i18n="Search Page"
                  >
                    Search Page
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="search-website.html"
                    data-i18n="Search Website"
                  >
                    Search Website
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="search-images.html"
                    data-i18n="Search Images"
                  >
                    Search Images
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="search-videos.html"
                    data-i18n="Search Videos"
                  >
                    Search Videos
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-unlock"></i>
                <span className="menu-title" data-i18n="Authentication">
                  Authentication
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="login-simple.html"
                    data-i18n="Login Simple"
                  >
                    Login Simple
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="login-with-bg.html"
                    data-i18n="Login with Bg"
                  >
                    Login with Bg
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="login-with-bg-image.html"
                    data-i18n="Login with Bg Image"
                  >
                    Login with Bg Image
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="register-simple.html"
                    data-i18n="Register Simple"
                  >
                    Register Simple
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="register-with-bg.html"
                    data-i18n="Register with Bg"
                  >
                    Register with Bg
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="register-with-bg-image.html"
                    data-i18n="Register with Bg Image"
                  >
                    Register with Bg Image
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="unlock-user.html"
                    data-i18n="Unlock User"
                  >
                    Unlock User
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="recover-password.html"
                    data-i18n="Recover Password"
                  >
                    Recover Password
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-alert-triangle"></i>
                <span className="menu-title" data-i18n="Error">
                  Error
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="error-400.html"
                    data-i18n="Error 400"
                  >
                    Error 400
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="error-401.html"
                    data-i18n="Error 401"
                  >
                    Error 401
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="error-403.html"
                    data-i18n="Error 403"
                  >
                    Error 403
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="error-404.html"
                    data-i18n="Error 404"
                  >
                    Error 404
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="error-500.html"
                    data-i18n="Error 500"
                  >
                    Error 500
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-watch"></i>
                <span className="menu-title" data-i18n="Coming Soon">
                  Coming Soon
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="coming-soon-flat.html"
                    data-i18n="Flat"
                  >
                    Flat
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="coming-soon-bg-image.html"
                    data-i18n="Bg image"
                  >
                    Bg image
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="coming-soon-bg-video.html"
                    data-i18n="Bg video"
                  >
                    Bg video
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="under-maintenance.html">
                <i className="feather icon-cloud-off"></i>
                <span className="menu-title" data-i18n="Maintenance">
                  Maintenance
                </span>
              </a>
            </li>
            <li className=" navigation-header">
              <span>UI</span>
              <i
                className="feather icon-droplet feather icon-minus"
                data-toggle="tooltip"
                data-placement="right"
                data-original-title="UI"
              ></i>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-globe"></i>
                <span className="menu-title" data-i18n="Content">
                  Content
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="content-grid.html"
                    data-i18n="Grid"
                  >
                    Grid
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="content-typography.html"
                    data-i18n="Typography"
                  >
                    Typography
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="content-text-utilities.html"
                    data-i18n="Text utilities"
                  >
                    Text utilities
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="content-syntax-highlighter.html"
                    data-i18n="Syntax highlighter"
                  >
                    Syntax highlighter
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="content-helper-classes.html"
                    data-i18n="Helper classes"
                  >
                    Helper classes
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-square"></i>
                <span className="menu-title" data-i18n="Cards">
                  Cards
                </span>
                <span className="badge badge badge-pill badge-success float-right mr-2">
                  Hot
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="card-bootstrap.html"
                    data-i18n="Bootstrap"
                  >
                    Bootstrap
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="card-headings.html"
                    data-i18n="Headings"
                  >
                    Headings
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="card-options.html"
                    data-i18n="Options"
                  >
                    Options
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="card-actions.html"
                    data-i18n="Action"
                  >
                    Action
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="card-draggable.html"
                    data-i18n="Draggable"
                  >
                    Draggable
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-layers"></i>
                <span className="menu-title" data-i18n="Advance Cards">
                  Advance Cards
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="card-statistics.html"
                    data-i18n="Statistics"
                  >
                    Statistics
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="card-weather.html"
                    data-i18n="Weather"
                  >
                    Weather
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="card-charts.html"
                    data-i18n="Charts"
                  >
                    Charts
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="card-maps.html"
                    data-i18n="Maps"
                  >
                    Maps
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="card-social.html"
                    data-i18n="Social"
                  >
                    Social
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="card-ecommerce.html"
                    data-i18n="E-Commerce"
                  >
                    E-Commerce
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-droplet"></i>
                <span className="menu-title" data-i18n="Color Palette">
                  Color Palette
                </span>
                <span className="badge badge badge-warning badge-pill float-right mr-2">
                  14
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="color-palette-primary.html"
                    data-i18n="Primary palette"
                  >
                    Primary palette
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="color-palette-danger.html"
                    data-i18n="Danger palette"
                  >
                    Danger palette
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="color-palette-success.html"
                    data-i18n="Success palette"
                  >
                    Success palette
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="color-palette-warning.html"
                    data-i18n="Warning palette"
                  >
                    Warning palette
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="color-palette-info.html"
                    data-i18n="Info palette"
                  >
                    Info palette
                  </a>
                </li>
                <li className="navigation-divider"></li>
                <li>
                  <a
                    className="menu-item"
                    href="color-palette-red.html"
                    data-i18n="Red palette"
                  >
                    Red palette
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="color-palette-pink.html"
                    data-i18n="Pink palette"
                  >
                    Pink palette
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="color-palette-purple.html"
                    data-i18n="Purple palette"
                  >
                    Purple palette
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="color-palette-blue.html"
                    data-i18n="Blue palette"
                  >
                    Blue palette
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="color-palette-cyan.html"
                    data-i18n="Cyan palette"
                  >
                    Cyan palette
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="color-palette-teal.html"
                    data-i18n="Teal palette"
                  >
                    Teal palette
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="color-palette-yellow.html"
                    data-i18n="Yellow palette"
                  >
                    Yellow palette
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="color-palette-amber.html"
                    data-i18n="Amber palette"
                  >
                    Amber palette
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="color-palette-blue-grey.html"
                    data-i18n="Blue Grey palette"
                  >
                    Blue Grey palette
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-eye"></i>
                <span className="menu-title" data-i18n="Icons">
                  Icons
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="icons-feather.html"
                    data-i18n="Feather"
                  >
                    Feather
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="icons-font-awesome.html"
                    data-i18n="Font Awesome"
                  >
                    Font Awesome
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="icons-simple-line-icons.html"
                    data-i18n="Simple Line Icons"
                  >
                    Simple Line Icons
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="icons-meteocons.html"
                    data-i18n="Meteocons"
                  >
                    Meteocons
                  </a>
                </li>
              </ul>
            </li>
            <li className=" navigation-header">
              <span>Components</span>
              <i
                className=" feather icon-minus"
                data-toggle="tooltip"
                data-placement="right"
                data-original-title="Components"
              ></i>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-briefcase"></i>
                <span className="menu-title" data-i18n="Bootstrap Components">
                  Bootstrap Components
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="component-alerts.html"
                    data-i18n="Alerts"
                  >
                    Alerts
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-callout.html"
                    data-i18n="Callout"
                  >
                    Callout
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="#" data-i18n="Buttons">
                    Buttons
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="component-buttons-basic.html"
                        data-i18n="Basic Buttons"
                      >
                        Basic Buttons
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="component-buttons-extended.html"
                        data-i18n="Extended Buttons"
                      >
                        Extended Buttons
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-carousel.html"
                    data-i18n="Carousel"
                  >
                    Carousel
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-collapse.html"
                    data-i18n="Collapse"
                  >
                    Collapse
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-dropdowns.html"
                    data-i18n="Dropdowns"
                  >
                    Dropdowns
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-list-group.html"
                    data-i18n="List Group"
                  >
                    List Group
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-modals.html"
                    data-i18n="Modals"
                  >
                    Modals
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-pagination.html"
                    data-i18n="Pagination"
                  >
                    Pagination
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-navs-component.html"
                    data-i18n="Navs Component"
                  >
                    Navs Component
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-tabs-component.html"
                    data-i18n="Tabs Component"
                  >
                    Tabs Component
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-pills-component.html"
                    data-i18n="Pills Component"
                  >
                    Pills Component
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-tooltips.html"
                    data-i18n="Tooltips"
                  >
                    Tooltips
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-popovers.html"
                    data-i18n="Popovers"
                  >
                    Popovers
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-badges.html"
                    data-i18n="Badges"
                  >
                    Badges
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-pill-badges.html"
                    data-i18n="Pill Badges"
                  >
                    Pill Badges
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-progress.html"
                    data-i18n="Progress"
                  >
                    Progress
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-media-objects.html"
                    data-i18n="Media Objects"
                  >
                    Media Objects
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-scrollable.html"
                    data-i18n="Scrollable"
                  >
                    Scrollable
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-bs-spinner.html"
                    data-i18n="Spinner"
                  >
                    Spinner
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-bs-toast.html"
                    data-i18n="Toasts"
                  >
                    Toasts
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-box"></i>
                <span className="menu-title" data-i18n="Extra Components">
                  Extra Components
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="ex-component-avatar.html"
                    data-i18n="Avatar"
                  >
                    Avatar
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="ex-component-sweet-alerts.html"
                    data-i18n="Sweet Alerts"
                  >
                    Sweet Alerts
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="ex-component-ratings.html"
                    data-i18n="Ratings"
                  >
                    Ratings
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="ex-component-toastr.html"
                    data-i18n="Toastr"
                  >
                    Toastr
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="ex-component-noui-slider.html"
                    data-i18n="NoUI Slider"
                  >
                    NoUI Slider
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="ex-component-knob.html"
                    data-i18n="Knob"
                  >
                    Knob
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="ex-component-block-ui.html"
                    data-i18n="Block UI"
                  >
                    Block UI
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="ex-component-date-time-picker.html"
                    data-i18n="DateTime Picker"
                  >
                    DateTime Picker
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="ex-component-file-uploader-dropzone.html"
                    data-i18n="File Uploader"
                  >
                    File Uploader
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="ex-component-image-cropper.html"
                    data-i18n="Image Cropper"
                  >
                    Image Cropper
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="component-spinners.html"
                    data-i18n="Spinners"
                  >
                    Spinners
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="ex-component-tour.html"
                    data-i18n="Tour"
                  >
                    Tour
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="ex-component-swiper.html"
                    data-i18n="Swiper"
                  >
                    Swiper
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="ex-component-treeview.html"
                    data-i18n="TreeView"
                  >
                    TreeView
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="ex-component-drag-drop.html"
                    data-i18n="Drag &amp; Drop"
                  >
                    Drag &amp; Drop
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="ex-component-media-player.html"
                    data-i18n="Media player"
                  >
                    Media player
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="ex-component-i18n.html"
                    data-i18n="i18n"
                  >
                    i18n
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="ex-component-miscellaneous.html"
                    data-i18n="Miscellaneous"
                  >
                    Miscellaneous
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-edit"></i>
                <span className="menu-title" data-i18n="Forms">
                  Forms
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a className="menu-item" href="#" data-i18n="Form Elements">
                    Form Elements
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="form-inputs.html"
                        data-i18n="Form Inputs"
                      >
                        Form Inputs
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="form-input-groups.html"
                        data-i18n="Input Groups"
                      >
                        Input Groups
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="form-input-grid.html"
                        data-i18n="Input Grid"
                      >
                        Input Grid
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="form-extended-inputs.html"
                        data-i18n="Extended Inputs"
                      >
                        Extended Inputs
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="form-checkboxes-radios.html"
                        data-i18n="Checkboxes &amp; Radios"
                      >
                        Checkboxes &amp; Radios
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="form-switch.html"
                        data-i18n="Switch"
                      >
                        Switch
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="form-select2.html"
                        data-i18n="Select2"
                      >
                        Select2
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="form-tags-input.html"
                        data-i18n="Tags Input"
                      >
                        Tags Input
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="form-validation.html"
                        data-i18n="Validation"
                      >
                        Validation
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="form-text-editor.html"
                        data-i18n="Text editor"
                      >
                        Text editor
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="menu-item" href="#" data-i18n="Form Layouts">
                    Form Layouts
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="form-layout-basic.html"
                        data-i18n="Basic Forms"
                      >
                        Basic Forms
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="form-layout-horizontal.html"
                        data-i18n="Horizontal Forms"
                      >
                        Horizontal Forms
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="form-layout-hidden-labels.html"
                        data-i18n="Hidden Labels"
                      >
                        Hidden Labels
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="form-layout-form-actions.html"
                        data-i18n="Form Actions"
                      >
                        Form Actions
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="form-layout-bordered.html"
                        data-i18n="Bordered"
                      >
                        Bordered
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="form-layout-striped-rows.html"
                        data-i18n="Striped Rows"
                      >
                        Striped Rows
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="form-dual-listbox.html"
                    data-i18n="Dual Listbox"
                  >
                    Dual Listbox
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="form-wizard.html"
                    data-i18n="Form Wizard"
                  >
                    Form Wizard
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="form-repeater.html"
                    data-i18n="Form Repeater"
                  >
                    Form Repeater
                  </a>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-grid"></i>
                <span className="menu-title" data-i18n="Tables">
                  Tables
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="#"
                    data-i18n="Bootstrap Tables"
                  >
                    Bootstrap Tables
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="table-basic.html"
                        data-i18n="Basic Tables"
                      >
                        Basic Tables
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="table-border.html"
                        data-i18n="Table Border"
                      >
                        Table Border
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="table-sizing.html"
                        data-i18n="Table Sizing"
                      >
                        Table Sizing
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="table-styling.html"
                        data-i18n="Table Styling"
                      >
                        Table Styling
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="table-components.html"
                        data-i18n="Table Components"
                      >
                        Table Components
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="menu-item" href="#" data-i18n="DataTables">
                    DataTables
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="dt-basic-initialization.html"
                        data-i18n="Basic Initialisation"
                      >
                        Basic Initialisation
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="dt-advanced-initialization.html"
                        data-i18n="Advanced initialisation"
                      >
                        Advanced initialisation
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="dt-styling.html"
                        data-i18n="Styling"
                      >
                        Styling
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="dt-data-sources.html"
                        data-i18n="Data Sources"
                      >
                        Data Sources
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="dt-api.html"
                        data-i18n="API"
                      >
                        API
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="#"
                        data-i18n="DataTables Ext."
                      >
                        DataTables Ext.
                      </a>
                      <ul className="menu-content">
                        <li>
                          <a
                            className="menu-item"
                            href="dt-extensions-autofill.html"
                            data-i18n="AutoFill"
                          >
                            AutoFill
                          </a>
                        </li>
                        <li>
                          <a className="menu-item" href="#" data-i18n="Buttons">
                            Buttons
                          </a>
                          <ul className="menu-content">
                            <li>
                              <a
                                className="menu-item"
                                href="dt-extensions-buttons-basic.html"
                                data-i18n="Basic Buttons"
                              >
                                Basic Buttons
                              </a>
                            </li>
                            <li>
                              <a
                                className="menu-item"
                                href="dt-extensions-buttons-html-5-data-export.html"
                                data-i18n="HTML 5 Data Export"
                              >
                                HTML 5 Data Export
                              </a>
                            </li>
                            <li>
                              <a
                                className="menu-item"
                                href="dt-extensions-buttons-flash-data-export.html"
                                data-i18n="Flash Data Export"
                              >
                                Flash Data Export
                              </a>
                            </li>
                            <li>
                              <a
                                className="menu-item"
                                href="dt-extensions-buttons-column-visibility.html"
                                data-i18n="Column Visibility"
                              >
                                Column Visibility
                              </a>
                            </li>
                            <li>
                              <a
                                className="menu-item"
                                href="dt-extensions-buttons-print.html"
                                data-i18n="Print"
                              >
                                Print
                              </a>
                            </li>
                            <li>
                              <a
                                className="menu-item"
                                href="dt-extensions-buttons-api.html"
                                data-i18n="API"
                              >
                                API
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a
                            className="menu-item"
                            href="dt-extensions-column-reorder.html"
                            data-i18n="Column Reorder"
                          >
                            Column Reorder
                          </a>
                        </li>
                        <li>
                          <a
                            className="menu-item"
                            href="dt-extensions-fixed-columns.html"
                            data-i18n="Fixed Columns"
                          >
                            Fixed Columns
                          </a>
                        </li>
                        <li>
                          <a
                            className="menu-item"
                            href="dt-extensions-key-table.html"
                            data-i18n="Key Table"
                          >
                            Key Table
                          </a>
                        </li>
                        <li>
                          <a
                            className="menu-item"
                            href="dt-extensions-row-reorder.html"
                            data-i18n="Row Reorder"
                          >
                            Row Reorder
                          </a>
                        </li>
                        <li>
                          <a
                            className="menu-item"
                            href="dt-extensions-select.html"
                            data-i18n="Select"
                          >
                            Select
                          </a>
                        </li>
                        <li>
                          <a
                            className="menu-item"
                            href="dt-extensions-fix-header.html"
                            data-i18n="Fix Header"
                          >
                            Fix Header
                          </a>
                        </li>
                        <li>
                          <a
                            className="menu-item"
                            href="dt-extensions-responsive.html"
                            data-i18n="Responsive"
                          >
                            Responsive
                          </a>
                        </li>
                        <li>
                          <a
                            className="menu-item"
                            href="dt-extensions-column-visibility.html"
                            data-i18n="Column Visibility"
                          >
                            Column Visibility
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-bar-chart-2"></i>
                <span className="menu-title" data-i18n="Charts">
                  Charts
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="charts-apexcharts.html"
                    data-i18n="Apex Charts"
                  >
                    Apex Charts
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="#" data-i18n="Chartjs">
                    Chartjs
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="chartjs-line-charts.html"
                        data-i18n="Line charts"
                      >
                        Line charts
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="chartjs-bar-charts.html"
                        data-i18n="Bar charts"
                      >
                        Bar charts
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="chartjs-pie-doughnut-charts.html"
                        data-i18n="Pie &amp; Doughnut charts"
                      >
                        Pie &amp; Doughnut charts
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="chartjs-scatter-charts.html"
                        data-i18n="Scatter charts"
                      >
                        Scatter charts
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="chartjs-polar-radar-charts.html"
                        data-i18n="Polar &amp; Radar charts"
                      >
                        Polar &amp; Radar charts
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="chartjs-advance-charts.html"
                        data-i18n="Advance charts"
                      >
                        Advance charts
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="morris-charts.html"
                    data-i18n="Morris Charts"
                  >
                    Morris Charts
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="#" data-i18n="Chartist">
                    Chartist
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="chartist-line-charts.html"
                        data-i18n="Line charts"
                      >
                        Line charts
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="chartist-bar-charts.html"
                        data-i18n="Bar charts"
                      >
                        Bar charts
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="chartist-pie-charts.html"
                        data-i18n="Pie charts"
                      >
                        Pie charts
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-map"></i>
                <span className="menu-title" data-i18n="Maps">
                  Maps
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="maps-leaflet.html"
                    data-i18n="Leaflet Maps"
                  >
                    Leaflet Maps
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="vector-maps-jvector.html"
                    data-i18n="jVector Map"
                  >
                    jVector Map
                  </a>
                </li>
              </ul>
            </li>
            <li className=" navigation-header">
              <span>Others</span>
              <i
                className=" feather icon-minus"
                data-toggle="tooltip"
                data-placement="right"
                data-original-title="Others"
              ></i>
            </li>
            <li className=" nav-item">
              <a href="#">
                <i className="feather icon-align-left"></i>
                <span className="menu-title" data-i18n="Menu levels">
                  Menu levels
                </span>
              </a>
              <ul className="menu-content">
                <li>
                  <a className="menu-item" href="#" data-i18n="Second level">
                    Second level
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="#"
                    data-i18n="Second level child"
                  >
                    Second level child
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a className="menu-item" href="#" data-i18n="Third level">
                        Third level
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="#"
                        data-i18n="Third level child"
                      >
                        Third level child
                      </a>
                      <ul className="menu-content">
                        <li>
                          <a
                            className="menu-item"
                            href="#"
                            data-i18n="Fourth level"
                          >
                            Fourth level
                          </a>
                        </li>
                        <li>
                          <a
                            className="menu-item"
                            href="#"
                            data-i18n="Fourth level"
                          >
                            Fourth level
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="disabled nav-item">
              <a href="#">
                <i className="feather icon-slash"></i>
                <span className="menu-title" data-i18n="Disabled Menu">
                  Disabled Menu
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a href="https://pixinvent.ticksy.com/" target="_blank">
                <i className="feather icon-life-buoy"></i>
                <span className="menu-title" data-i18n="Raise Support">
                  Raise Support
                </span>
              </a>
            </li>
            <li className=" nav-item">
              <a
                href="https://pixinvent.com/stack-bootstrap-admin-template/documentation"
                target="_blank"
              >
                <i className="feather icon-folder"></i>
                <span className="menu-title" data-i18n="Documentation">
                  Documentation
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* <!-- END: Main Menu--> */}

      {/* <!-- BEGIN: Content--> */}
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            {/* <!-- Grouped multiple cards for statistics starts here --> */}
            <div className="row grouped-multiple-statistics-card">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-6 col-xl-3 col-sm-6 col-12">
                        <div className="d-flex align-items-start mb-sm-1 mb-xl-0 border-right-blue-grey border-right-lighten-5">
                          <span className="card-icon primary d-flex justify-content-center mr-3">
                            <i className="icon p-1 icon-bar-chart customize-icon font-large-2 p-1"></i>
                          </span>
                          <div className="stats-amount mr-3">
                            <h3 className="heading-text text-bold-600">$95k</h3>
                            <p className="sub-heading">Revenue</p>
                          </div>
                          <span className="inc-dec-percentage">
                            <small className="success">
                              <i className="fa fa-long-arrow-up"></i> 5.2%
                            </small>
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-3 col-sm-6 col-12">
                        <div className="d-flex align-items-start mb-sm-1 mb-xl-0 border-right-blue-grey border-right-lighten-5">
                          <span className="card-icon danger d-flex justify-content-center mr-3">
                            <i className="icon p-1 icon-pie-chart customize-icon font-large-2 p-1"></i>
                          </span>
                          <div className="stats-amount mr-3">
                            <h3 className="heading-text text-bold-600">
                              18.63%
                            </h3>
                            <p className="sub-heading">Growth Rate</p>
                          </div>
                          <span className="inc-dec-percentage">
                            <small className="danger">
                              <i className="fa fa-long-arrow-down"></i> 2.0%
                            </small>
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-3 col-sm-6 col-12">
                        <div className="d-flex align-items-start border-right-blue-grey border-right-lighten-5">
                          <span className="card-icon success d-flex justify-content-center mr-3">
                            <i className="icon p-1 icon-graph customize-icon font-large-2 p-1"></i>
                          </span>
                          <div className="stats-amount mr-3">
                            <h3 className="heading-text text-bold-600">$27k</h3>
                            <p className="sub-heading">Sales</p>
                          </div>
                          <span className="inc-dec-percentage">
                            <small className="success">
                              <i className="fa fa-long-arrow-up"></i> 10.0%
                            </small>
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-3 col-sm-6 col-12">
                        <div className="d-flex align-items-start">
                          <span className="card-icon warning d-flex justify-content-center mr-3">
                            <i className="icon p-1 icon-basket-loaded customize-icon font-large-2 p-1"></i>
                          </span>
                          <div className="stats-amount mr-3">
                            <h3 className="heading-text text-bold-600">
                              13700
                            </h3>
                            <p className="sub-heading">Orders</p>
                          </div>
                          <span className="inc-dec-percentage">
                            <small className="danger">
                              <i className="fa fa-long-arrow-down"></i> 13.6%
                            </small>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Grouped multiple cards for statistics ends here -->

              <!-- Minimal modern charts for power consumption, region statistics and sales etc. starts here --> */}
            <div className="row minimal-modern-charts">
              {/* <!-- power consumption chart --> */}
              <div className="col-xxl-6 col-xl-8 col-lg-8 col-md-12 col-12 power-consumption-stats-chart">
                <div className="card">
                  <div className="card-content pt-2 px-1">
                    <div className="row">
                      <div className="col-8 d-flex">
                        <div className="ml-1">
                          <h4 className="power-consumption-stats-title text-bold-500">
                            Power consumption
                          </h4>
                        </div>
                        <div className="ml-50 mr-50">
                          <p>(kWh/100km)</p>
                        </div>
                      </div>
                      <div className="col-4 d-flex justify-content-end pr-3">
                        <div className="dark-text">
                          <h5 className="power-consumption-active-tab text-bold-500">
                            Week
                          </h5>
                        </div>
                        <div className="light-text ml-2">
                          <h5>Month</h5>
                        </div>
                      </div>
                    </div>
                    <div id="spline-chart"></div>
                  </div>
                </div>
              </div>

              {/* <!-- tracking stats chart --> */}
              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-12 tracking-stats-chart">
                <div className="card chart-with-tabs">
                  <div className="card-content">
                    <ul
                      className="nav nav-pills card-tabs mb-2 pl-2 border-bottom-blue-grey border-bottom-lighten-5"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link text-primary bg-transparent active px-0 mr-1 py-1"
                          id="pills-home-tab"
                          data-toggle="pill"
                          href="#pills-home"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          Charts
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link text-primary bg-transparent px-0 py-1"
                          id="pills-profile-tab"
                          data-toggle="pill"
                          href="#pills-profile"
                          role="tab"
                          aria-controls="pills-profile"
                          aria-selected="false"
                        >
                          Tracking
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        <div className="body-header pl-2">
                          <div className="d-flex">
                            <h3 className="mr-2 body-header-title text-bold-600 mb-0">
                              1,934
                            </h3>
                            <small className="success">
                              <i className="fa fa-long-arrow-up"></i> +8.0%
                            </small>
                          </div>
                          <div className="body-header-subtitle">
                            <span className="text-muted">Sales</span>
                          </div>
                        </div>
                        <div id="product_sales_column_basic_chart"></div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-profile-tab"
                      >
                        <div className="tracking-tab-container px-2">
                          <div className="tracking-tab-content">
                            <div className="top-content d-flex flex-wrap justify-content-start mt-2 pb-1 mb-2">
                              <div className="tracking-heading-icon mr-2">
                                <i className="icon icon-pie-chart"></i>
                              </div>
                              <div className="pb-75">
                                <h5 className="tracking-tab-title mb-0 text-bold-600">
                                  Total Sales
                                </h5>
                                <small className="text-muted">
                                  Top selling products
                                </small>
                              </div>
                            </div>
                            <div className="bottom-content">
                              <ul className="tracking-list list-group">
                                <li className="list-group-item border py-1 px-0 d-flex justify-content-between align-items-center">
                                  <span className="tracking-task text-bold-600 text-left">
                                    Stack Admin
                                  </span>
                                  <span className="badge badge-pill badge-warning px-1 py-50">
                                    Medium
                                  </span>
                                </li>
                                <li className="list-group-item border py-1 px-0 d-flex justify-content-between align-items-center">
                                  <span className="tracking-task text-bold-600 text-left">
                                    Convex Admin
                                  </span>
                                  <span className="badge badge-pill badge-success px-1 py-50">
                                    High
                                  </span>
                                </li>
                                <li className="list-group-item border py-1 px-0 d-flex justify-content-between align-items-center">
                                  <span className="tracking-task text-bold-600 text-left">
                                    Frest Admin
                                  </span>
                                  <span className="badge badge-pill badge-warning px-1 py-50">
                                    Medium
                                  </span>
                                </li>
                                <li className="list-group-item border py-1 px-0 d-flex justify-content-between align-items-center">
                                  <span className="tracking-task text-bold-600 text-left">
                                    Material Admin
                                  </span>
                                  <span className="badge badge-pill badge-danger px-1 py-50">
                                    Low
                                  </span>
                                </li>
                                <li className="list-group-item border py-1 px-0 d-flex justify-content-between align-items-center">
                                  <span className="tracking-task text-bold-600 text-left">
                                    Vuexy Admin
                                  </span>
                                  <span className="badge badge-pill badge-success px-1 py-50">
                                    High
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- region stats chart --> */}
              <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-12 region-stats-chart">
                <div className="card statistic-card">
                  <div className="card-content">
                    <div className="top-row statistics-card-title border-bottom-blue-grey border-bottom-lighten-5">
                      <div className="py-1 pl-2 primary">
                        <span className="mb-1">Region Statistics</span>
                      </div>
                    </div>
                    <div className="statistics-chart d-flex justify-content-center align-self-center">
                      <div id="sales_in_region_pie_donut"></div>
                    </div>
                    <div className="statistics-chart-data d-flex justify-content-center ml-auto mr-auto pb-50 mb-2">
                      <div className="collection mr-1">
                        <span className="bullet bullet-xs bullet-warning"></span>
                        <span className="font-weight-bold">26%</span>
                      </div>
                      <div className="collection mr-1">
                        <span className="bullet bullet-xs bullet-danger"></span>
                        <span className="font-weight-bold">44%</span>
                      </div>
                      <div className="collection mr-1">
                        <span className="bullet bullet-xs bullet-primary"></span>
                        <span className="font-weight-bold">28%</span>
                      </div>
                    </div>
                    <div className="statistic-card-footer d-flex">
                      <div className="column-data py-1 text-center border-top-blue-grey border-top-lighten-5 flex-grow-1 text-center border-right-blue-grey border-right-lighten-5">
                        <p className="font-large-1 mb-0">$6.9k</p>
                        <span>Revenue</span>
                      </div>
                      <div className="column-data py-1 flex-grow-1 text-center border-top-blue-grey border-top-lighten-5">
                        <p className="font-large-1 mb-0">25</p>
                        <span>Sales</span>
                      </div>
                      <div className="column-data py-1 flex-grow-1 text-center border-top-blue-grey border-top-lighten-5 border-left-blue-grey border-left-lighten-5">
                        <p className="font-large-1 mb-0">11</p>
                        <span>Products</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- latest update tracking chart--> */}
              <div className="col-xxl-4 col-xl-8 col-lg-8 col-md-12 col-12 latest-update-tracking">
                <div className="card">
                  <div className="card-header latest-update-heading d-flex justify-content-between">
                    <h4 className="latest-update-heading-title text-bold-500">
                      Latest Update
                    </h4>
                    <div className="dropdown update-year-menu pb-1">
                      <a
                        className="bg-transparent dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        2019
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <a className="dropdown-item" href="#">
                          2018
                        </a>
                        <a className="dropdown-item" href="#">
                          2017
                        </a>
                        <a className="dropdown-item" href="#">
                          2016
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-content latest-update-tracking-list pt-0 pb-1 px-2 position-relative">
                    <ul className="list-group">
                      <li className="list-group-item pt-0 px-0 latest-updated-item border-0 d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className="list-group-item-icon d-inline mr-1">
                            <i className="icon text-primary bg-light-primary icon-bag total-products-icon rounded-circle p-50"></i>
                          </span>
                          <div>
                            <p className="mb-25 latest-update-item-name text-bold-600">
                              Total Products
                            </p>
                            <small className="font-small-3">
                              1.2k Products
                            </small>
                          </div>
                        </div>
                        <span className="update-profit text-bold-600">
                          $10.5k
                        </span>
                      </li>
                      <li className="list-group-item px-0 latest-updated-item border-0 d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className="list-group-item-icon d-inline mr-1">
                            <i className="icon icon-graph bg-light-info text-info total-sales-icon rounded-circle p-50"></i>
                          </span>
                          <div>
                            <p className="mb-25 latest-update-item-name text-bold-600">
                              Total Sales
                            </p>
                            <small className="font-small-3">39.2k Sales</small>
                          </div>
                        </div>
                        <span className="update-profit text-bold-600">26M</span>
                      </li>
                      <li className="list-group-item px-0 latest-updated-item border-0 d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className="list-group-item-icon d-inline mr-1">
                            <i className="icon icon-bag bg-light-danger text-danger total-products-icon rounded-circle p-50"></i>
                          </span>
                          <div>
                            <p className="mb-25 latest-update-item-name text-bold-600">
                              Total Products
                            </p>
                            <small className="font-small-3">
                              1.2k Products
                            </small>
                          </div>
                        </div>
                        <span className="update-profit text-bold-600">
                          $10.5k
                        </span>
                      </li>
                      <li className="list-group-item px-0 latest-updated-item border-0 d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <div className="list-group-item-icon d-inline mr-1">
                            <i className="icon icon-credit-card bg-light-primary text-primary total-revenue-icon rounded-circle p-50"></i>
                          </div>
                          <div>
                            <p className="mb-25 latest-update-item-name text-bold-600">
                              Total Revenue
                            </p>
                            <small className="font-small-3">
                              45.5k New Revenue
                            </small>
                          </div>
                        </div>
                        <span className="update-profit text-bold-600">
                          15.6M
                        </span>
                      </li>
                      <li className="list-group-item px-0 latest-updated-item border-0 d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className="list-group-item-icon d-inline mr-1">
                            <i className="icon icon-graph bg-light-info text-info total-sales-icon rounded-circle p-50"></i>
                          </span>
                          <div>
                            <p className="mb-25 latest-update-item-name text-bold-600">
                              Total Sales
                            </p>
                            <small className="font-small-3">39.2k Sales</small>
                          </div>
                        </div>
                        <span className="update-profit text-bold-600">26M</span>
                      </li>
                      <li className="list-group-item px-0 latest-updated-item border-0 pb-0 d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <div className="list-group-item-icon d-inline mr-1">
                            <i className="icon icon-credit-card bg-light-danger text-danger total-revenue-icon rounded-circle p-50"></i>
                          </div>
                          <div>
                            <p className="mb-25 latest-update-item-name text-bold-600">
                              Total Revenue
                            </p>
                            <small className="font-small-3">
                              45.5k New Revenue
                            </small>
                          </div>
                        </div>
                        <span className="update-profit text-bold-600">
                          15.6M
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <!-- info and time tracking chart --> */}
              <div className="col-xxl-8 col-xl-12 col-lg-12 col-md-12 col-12">
                <div className="card info-time-tracking">
                  <div className="card-content">
                    <div className="row">
                      <div className="col-12 pt-2 pb-2 border-bottom-blue-grey border-bottom-lighten-5">
                        <div className="info-time-tracking-title d-flex justify-content-between align-items-center">
                          <h4 className="pl-2 mb-0 title-info-time-heading text-bold-500">
                            Information Time Tracking
                          </h4>
                          <span className="pr-2">
                            <i className="icon icon-settings"></i>
                          </span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="info-time-tracking-content">
                          <div className="row">
                            <div className="col-md-6 col-sm-12 border-right-blue-grey border-right-lighten-5">
                              <div className="general-task-loading pr-2 pl-4 px-sm-4 px-md-2 py-md-2 d-flex justify-content-start">
                                <div id="general_task_radial_bar_chart"></div>
                                <div className="task-content d-flex flex-column align-items-start justify-content-center">
                                  <h5 className="font-weight-bold mt-2 mt-sm-0">
                                    General task loading
                                  </h5>
                                  <p className="leading-para">
                                    The system automatically detects the loading
                                    of your tasks. including sales and revenue.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <div className="pr-2 total-stats pl-4 px-sm-4 px-md-2 py-md-2 d-flex justify-content-start">
                                <div id="info_tracking_total_stats"></div>
                                <div className="pl-2 ml-50 stats-content d-flex flex-column align-items-start justify-content-center pr-2">
                                  <h5 className="font-weight-bold">
                                    Total Stats
                                  </h5>
                                  <p className="leading-para">
                                    Your criticaly anylyzed success data
                                    regarding revenue and sales for the last
                                    week.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Minimal modern charts for power consumption, region statistics and sales etc. starts here --> */}

            {/* <!-- active users and my task timeline cards starts here --> */}
            <div className="row match-height">
              {/* <!-- active users card --> */}
              <div className="col-xl-8 col-lg-12">
                <div className="card active-users">
                  <div className="card-header border-0">
                    <h4 className="card-title">Active Users</h4>
                    <a className="heading-elements-toggle">
                      <i className="fa fa-ellipsis-v font-medium-3"></i>
                    </a>
                    <div className="heading-elements">
                      <ul className="list-inline mb-0">
                        <li>
                          <a data-action="reload">
                            <i className="feather icon-rotate-cw"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-content">
                    <div
                      id="audience-list-scroll"
                      className="table-responsive position-relative"
                    >
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Available Data</th>
                            <th>Downloads</th>
                            <th>Status</th>
                            <th>More</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-truncate">
                              <div className="avatar avatar-md mr-1">
                                <img
                                  className="rounded-circle"
                                  src={avatar1}
                                  alt="Generic placeholder image"
                                />
                              </div>
                              <span className="text-truncate">
                                Shwell Flintof
                              </span>
                            </td>
                            <td className="align-middle">
                              <span>shwellFlint@gmail.com</span>
                            </td>
                            <td className="align-middle">
                              <span>450MB</span>
                            </td>
                            <td className="align-middle">
                              <div className="progress my-75">
                                <div
                                  className="progress-bar progress-bar-striped bg-success"
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="20"
                                  aria-valuemax="100"
                                  style={{ width: "55%" }}
                                >
                                  55%
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <span className="badge badge-success">
                                Active
                              </span>
                            </td>
                            <td className="align-middle">
                              <div className="dropdown">
                                <span
                                  className="feather icon-more-vertical dropdown-toggle"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                ></span>
                                <span>
                                  <div
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    <a className="dropdown-item" href="#">
                                      Subscription
                                    </a>
                                    <a className="dropdown-item" href="#">
                                      Extras
                                    </a>
                                    <a className="dropdown-item" href="#">
                                      Newslatter
                                    </a>
                                  </div>
                                </span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-truncate">
                              <div className="avatar avatar-md mr-1">
                                <img
                                  className="rounded-circle"
                                  src={avatar5}
                                  alt="Generic placeholder image"
                                />
                              </div>
                              <span className="text-truncate">
                                Ogasawara Katsumi
                              </span>
                            </td>
                            <td className="align-middle">
                              <span>ogaats@hmail.com</span>
                            </td>
                            <td className="align-middle">
                              <span>457 MB</span>
                            </td>
                            <td className="align-middle">
                              <div className="progress my-75">
                                <div
                                  className="progress-bar progress-bar-striped bg-warning"
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="20"
                                  aria-valuemax="100"
                                  style={{ width: "55%" }}
                                >
                                  55%
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <span className="badge badge-warning">
                                Reported
                              </span>
                            </td>
                            <td className="align-middle">
                              <div className="dropdown">
                                <span
                                  className="feather icon-more-vertical dropdown-toggle"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                ></span>
                                <div
                                  className="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a className="dropdown-item" href="#">
                                    Subscription
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Extras
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Newslatter
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-truncate">
                              <div className="avatar avatar-md mr-1">
                                <img
                                  className="rounded-circle"
                                  src={avatar6}
                                  alt="Generic placeholder image"
                                />
                              </div>
                              <span className="text-truncate">
                                Stepan Assonov
                              </span>
                            </td>
                            <td className="align-middle">
                              <span>stepan23@hmail.com</span>
                            </td>
                            <td className="align-middle">
                              <span>231 MB</span>
                            </td>
                            <td className="align-middle">
                              <div className="progress my-75">
                                <div
                                  className="progress-bar progress-bar-striped bg-danger"
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="20"
                                  aria-valuemax="100"
                                  style={{ width: "65%" }}
                                >
                                  65%
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <span className="badge badge-danger">Block</span>
                            </td>
                            <td className="align-middle">
                              <div className="dropdown">
                                <span
                                  className="feather icon-more-vertical dropdown-toggle"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                ></span>
                                <div
                                  className="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a className="dropdown-item" href="#">
                                    Subscription
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Extras
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Newslatter
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-truncate">
                              <div className="avatar avatar-md mr-1">
                                <img
                                  className="rounded-circle"
                                  src={avatar7}
                                  alt="Generic placeholder image"
                                />
                              </div>
                              <span className="text-truncate">
                                Mbe Tshinguta
                              </span>
                            </td>
                            <td className="align-middle">
                              <span>tshinguta@hmail.com</span>
                            </td>
                            <td className="align-middle">
                              <span>723 MB</span>
                            </td>
                            <td className="align-middle">
                              <div className="progress my-75">
                                <div
                                  className="progress-bar progress-bar-striped bg-success"
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="20"
                                  aria-valuemax="100"
                                  style={{ width: "78%" }}
                                >
                                  78%
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <span className="badge badge-success">
                                Active
                              </span>
                            </td>
                            <td className="align-middle">
                              <div className="dropdown">
                                <span
                                  className="feather icon-more-vertical dropdown-toggle"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                ></span>
                                <div
                                  className="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a className="dropdown-item" href="#">
                                    Subscription
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Extras
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Newslatter
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-truncate">
                              <div className="avatar avatar-md mr-1">
                                <img
                                  className="rounded-circle"
                                  src={avatar8}
                                  alt="Generic placeholder image"
                                />
                              </div>
                              <span className="text-truncate">Marco Alves</span>
                            </td>
                            <td className="align-middle">
                              <span>maralv@dmail.com</span>
                            </td>
                            <td className="align-middle">
                              <span>120 MB</span>
                            </td>
                            <td className="align-middle">
                              <div className="progress my-75">
                                <div
                                  className="progress-bar progress-bar-striped bg-warning"
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="20"
                                  aria-valuemax="100"
                                  style={{ width: "51%" }}
                                >
                                  51%
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <span className="badge badge-warning">
                                Reported
                              </span>
                            </td>
                            <td className="align-middle">
                              <div className="dropdown">
                                <span
                                  className="feather icon-more-vertical dropdown-toggle"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                ></span>
                                <div
                                  className="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a className="dropdown-item" href="#">
                                    Subscription
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Extras
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Newslatter
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-truncate">
                              <div className="avatar avatar-md mr-1">
                                <img
                                  className="rounded-circle"
                                  src={avatar9}
                                  alt="Generic placeholder image"
                                />
                              </div>
                              <span className="text-truncate">
                                Lucas Pacheco
                              </span>
                            </td>
                            <td className="align-middle">
                              <span>pacheco@hmail.com</span>
                            </td>
                            <td className="align-middle">
                              <span>532 MB</span>
                            </td>
                            <td className="align-middle">
                              <div className="progress my-75">
                                <div
                                  className="progress-bar progress-bar-striped bg-danger"
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="20"
                                  aria-valuemax="100"
                                  style={{ width: "47%" }}
                                >
                                  47%
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <span className="badge badge-danger">
                                Blocked
                              </span>
                            </td>
                            <td className="align-middle">
                              <div className="dropdown">
                                <span
                                  className="feather icon-more-vertical dropdown-toggle"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                ></span>
                                <div
                                  className="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a className="dropdown-item" href="#">
                                    Subscription
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Extras
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Newslatter
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- my task Timeline --> */}
              <div className="col-xl-4 col-lg-12">
                <div className="card">
                  <div className="card-header border-0">
                    <h4 className="card-title">My Tasks</h4>
                    <div className="heading-elements">
                      <ul className="list-inline">
                        <li>
                          <a data-action="reload">
                            <i className="feather icon-rotate-cw"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="card-body">
                      <div className="widget-timeline">
                        <ul>
                          <li className="timeline-items timeline-icon-success">
                            <p className="timeline-time">Monday 12:12pm</p>
                            <div className="timeline-title">
                              Catch Up With Brain
                            </div>
                            <div className="timeline-subtitle">
                              Mobile Project
                            </div>
                            <div>
                              <ul className="list-unstyled users-list cursor-pointer m-0 d-flex align-items-center">
                                <li className="avatar avatar-sm pull-up my-0">
                                  <img
                                    className="rounded-circle"
                                    src={avatar10}
                                    alt="Generic placeholder image"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Ogasawara"
                                  />
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="timeline-items timeline-icon-danger">
                            <p className="timeline-time">2 days ago</p>
                            <div className="timeline-title">Make new icons</div>
                            <div className="timeline-subtitle">Web Apps</div>
                          </li>
                          <li className="timeline-items timeline-icon-warning">
                            <p className="timeline-time">Yesterday</p>
                            <div className="timeline-title">
                              <span>Design explorations</span>
                              <span className="badge badge-pill badge-sm badge-success">
                                Completed
                              </span>
                            </div>
                            <div className="timeline-subtitle">
                              Company Website
                            </div>
                          </li>
                          <li className="timeline-items timeline-icon-info">
                            <p className="timeline-time">5 hours ago</p>
                            <div className="timeline-title">
                              Lunch with Mary
                            </div>
                            <div className="timeline-subtitle">Grill House</div>
                            <div>
                              <ul className="list-unstyled users-list cursor-pointer m-0 d-flex align-items-center">
                                <li className="avatar avatar-sm pull-up my-0">
                                  <img
                                    className="rounded-circle"
                                    src={avatar10}
                                    alt="Generic placeholder image"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Ogasawara"
                                  />
                                </li>
                                <li className="avatar avatar-sm pull-up my-0">
                                  <img
                                    className="rounded-circle"
                                    src={avatar10}
                                    alt="Generic placeholder image"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Stepan"
                                  />
                                </li>
                                <li className="avatar avatar-sm pull-up my-0">
                                  <img
                                    className="rounded-circle"
                                    src={avatar10}
                                    alt="Generic placeholder image"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Kimberly"
                                  />
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- active users and my task timeline cards ends here --> */}
          </div>
        </div>
      </div>
      {/* <!-- END: Content--> */}

      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>

      {/* <!-- BEGIN: Footer--> */}
      <Footer />
    </>
    // </div>
  );
}

export default App;
