import React, { useState, useEffect } from "react";
import { getAllServices } from "../api/serviceApis";
import { useAuth } from "../context/authContext";

const Services = () => {
  const { authData } = useAuth();
  const { user } = authData;
  const roleId = user.role_id;
  const subdomainId = user.subdomain_id;

  const [servicesData, setServicesData] = useState([]);


  useEffect(() => {
    getServices()
  }, []);

  const getServices = async () => {
    const services = await getAllServices(subdomainId);
    setServicesData(services);
  }

  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-header row mt-2">
          <div className="content-header-left col-md-6 col-12 mb-2">
            <h3 className="content-header-title mb-0">Services & Prices</h3>
            <div className="row breadcrumbs-top">
              <div className="breadcrumb-wrapper col-12">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item">Package List</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="content-body">
          <div className="row grouped-multiple-statistics-card">
            <div className="col-12">
              <section id="simple-user-cards-with-border" className="row mt-2">
                <div className="col-xl-4 col-md-4 col-12">
                  <div className="card border-green border-lighten-2 custom-card">
                    <div className="text-center">
                      <div className="card-body">
                        <div className="card box-shadow">
                          <div className="card-header pb-0">
                            <h2 className="my-0 font-weight-bold">
                              Studio Package
                            </h2>
                          </div>
                          <div className="card-body">
                            <h1 className="pricing-card-title">$385.00</h1>
                            <ul className="list-unstyled mt-2 mb-2">
                              <li>12 High resolution images</li>
                              <li>3 Aerial photos</li>
                              <li>1 Studio Floor plan</li>
                              <li>60mins</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 col-12">
                  <div className="card border-green border-lighten-2 custom-card">
                    <div className="text-center">
                      <div className="card-body">
                        <div className="card box-shadow">
                          <div className="card-header pb-0">
                            <h2 className="my-0 font-weight-bold">
                              Studio Package
                            </h2>
                          </div>
                          <div className="card-body">
                            <h1 className="pricing-card-title">$385.00</h1>
                            <ul className="list-unstyled mt-2 mb-2">
                              <li>12 High resolution images</li>
                              <li>3 Aerial photos</li>
                              <li>1 Studio Floor plan</li>
                              <li>40mins</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 col-12">
                  <div className="card border-green border-lighten-2 custom-card">
                    <div className="text-center">
                      <div className="card-body">
                        <div className="card box-shadow">
                          <div className="card-header pb-0">
                            <h2 className="my-0 font-weight-bold">
                              Studio Package
                            </h2>
                          </div>
                          <div className="card-body">
                            <h1 className="pricing-card-title">$385.00</h1>
                            <ul className="list-unstyled mt-2 mb-2">
                              <li>12 High resolution images</li>
                              <li>3 Aerial photos</li>
                              <li>1 Studio Floor plan</li>
                              <li>50mins</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-4 col-12">
                  <div className="card border-green border-lighten-2 custom-card">
                    <div className="text-center">
                      <div className="card-body">
                        <div className="card box-shadow">
                          <div className="card-header pb-0">
                            <h2 className="my-0 font-weight-bold">
                              Studio Photography
                            </h2>
                          </div>
                          <div className="card-body">
                            <h1 className="pricing-card-title">$195.00</h1>
                            <ul className="list-unstyled mt-2 mb-2">
                              <li>12 High Resolution Images</li>
                              <li>20mins</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-4 col-12">
                  <div className="card border-green border-lighten-2 custom-card">
                    <div className="text-center">
                      <div className="card-body">
                        <div className="card box-shadow">
                          <div className="card-header pb-0">
                            <h2 className="my-0 font-weight-bold">
                              Stock Images
                            </h2>
                          </div>
                          <div className="card-body">
                            <h1 className="pricing-card-title">$35.00</h1>
                            <ul className="list-unstyled mt-2 mb-2">
                              <li>1 Stock Images</li>
                              <li>30mins</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-4 col-12">
                  <div className="card border-green border-lighten-2 custom-card">
                    <div className="text-center">
                      <div className="card-body">
                        <div className="card box-shadow">
                          <div className="card-header pb-0">
                            <h2 className="my-0 font-weight-bold">
                              Studio Package
                            </h2>
                          </div>
                          <div className="card-body">
                            <h1 className="pricing-card-title">$385.00</h1>
                            <ul className="list-unstyled mt-2 mb-2">
                              <li>12 High resolution images</li>
                              <li>3 Aerial photos</li>
                              <li>1 Studio Floor plan</li>
                              <li>50mins</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 col-12">
                  <div className="card border-green border-lighten-2 custom-card">
                    <div className="text-center">
                      <div className="card-body">
                        <div className="card box-shadow">
                          <div className="card-header pb-0">
                            <h2 className="my-0 font-weight-bold">
                              Studio Package
                            </h2>
                          </div>
                          <div className="card-body">
                            <h1 className="pricing-card-title">$385.00</h1>
                            <ul className="list-unstyled mt-2 mb-2">
                              <li>12 High resolution images</li>
                              <li>3 Aerial photos</li>
                              <li>1 Studio Floor plan</li>
                              <li>80mins</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-4 col-12">
                  <div className="card border-green border-lighten-2 custom-card">
                    <div className="text-center">
                      <div className="card-body">
                        <div className="card box-shadow">
                          <div className="card-header pb-0">
                            <h2 className="my-0 font-weight-bold">
                              Studio Package
                            </h2>
                          </div>
                          <div className="card-body">
                            <h1 className="pricing-card-title">$385.00</h1>
                            <ul className="list-unstyled mt-2 mb-2">
                              <li>12 High resolution images</li>
                              <li>3 Aerial photos</li>
                              <li>60mins</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-4 col-12">
                  <div className="card border-green border-lighten-2 custom-card">
                    <div className="text-center">
                      <div className="card-body">
                        <div className="card box-shadow">
                          <div className="card-header pb-0">
                            <h2 className="my-0 font-weight-bold">
                              Studio Package
                            </h2>
                          </div>
                          <div className="card-body">
                            <h1 className="pricing-card-title">$385.00</h1>
                            <ul className="list-unstyled mt-2 mb-2">
                              <li>12 High resolution images</li>
                              <li>3 Aerial photos</li>
                              <li>1 Studio Floor plan</li>
                              <li>90mins</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
