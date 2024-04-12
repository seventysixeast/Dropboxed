import React, { useEffect, useState } from "react";
import { getAllClients } from "../api/clientApis";
import { getAllServices } from "../api/serviceApis";
import { addGallery } from "../api/galleryApis";
import { toast } from 'react-toastify';
import Select from "react-select";
import toolIcons from "../assets/images/i.png";
const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

export const Dashboard = () => {

  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    client: '',
    address: '',
    services: [],
    banner: '',
    status: ''
  });

  useEffect(() => {
    getClients();
    getServices();
  }, [])

  const getClients = async () => {
    try {
      let clients = await getAllClients();
      setClients(clients.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const getServices = async () => {
    try {
      let services = await getAllServices();
      setServices(services.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let gallery = { ...formData };
    if (name === "title") {
      gallery.title = value;
    } else if (name === "client") {
      gallery.client = value;
    } else if (name === 'address') {
      gallery.address = value
    } else if (name === 'status') {
      gallery.status = value
    }
    setFormData(gallery);
  };

  const handleBannerChange = (e) => {
    setFormData({
      ...formData,
      banner: e.target.files[0]
    });
  };

  const handleSelectedChange = (selectedOptions) => {
    setFormData({
      ...formData,
      services: selectedOptions
    });
  };

  const resetFormData = async () => {
    setFormData({
      id: '',
      title: '',
      client: '',
      address: '',
      services: [],
      banner: '',
      status: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      console.log("formData",formData);
      formDataToSend.append('id', formData.id);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('client', formData.client);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('services', formData.services);
      formDataToSend.append('banner', formData.banner);
      formDataToSend.append('status', formData.status);

      // let res = await addGallery(formDataToSend);
      // if (res.success) {
      //   toast.success(res.message);
      //   resetFormData();
      //   document.getElementById('closeModal').click();
      //   getAllClientsData();
      // } else {
      //   toast.error(res);
      // }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row mt-2">
            <div className="content-header-left col-md-6 col-12 mb-2">
              <h3 className="content-header-title mb-0">Dashboard</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Home</a>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="content-body">
            <div className="row grouped-multiple-statistics-card pb-2">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-xl-3 col-lg-6 col-12">
                        <div className="card">
                          <div className="card-content">
                            <div className="media align-items-stretch">
                              <div className="p-2 text-center bg-primary bg-darken-2">
                                <i className="icon-picture font-large-2 white"></i>
                              </div>
                              <div className="p-2 bg-gradient-x-primary white media-body">
                                <h5>0</h5>
                                <p className="text-bold-400 mb-0">
                                  Job In Progress
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-12">
                        <div className="card">
                          <div className="card-content">
                            <div className="media align-items-stretch">
                              <div className="p-2 text-center bg-danger bg-darken-2">
                                <i className="icon-cloud-upload font-large-2 white"></i>
                              </div>
                              <div className="p-1 bg-gradient-x-danger white media-body">
                                <h5>0</h5>
                                <p className="text-bold-400 mb-0">
                                  Completed Orders
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-12">
                        <div className="card">
                          <div className="card-content">
                            <div className="media align-items-stretch">
                              <div className="p-2 text-center bg-warning bg-darken-2">
                                <i className="icon-calendar font-large-2 white"></i>
                              </div>
                              <div className="p-2 bg-gradient-x-warning white media-body">
                                <h5>0</h5>
                                <p className="text-bold-400 mb-0">
                                  Active Booking
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-12">
                        <div className="card">
                          <div className="card-content">
                            <div className="media align-items-stretch">
                              <div className="p-2 text-center bg-success bg-darken-2">
                                <i className="icon-bag font-large-2 white"></i>
                              </div>
                              <div className="p-2 bg-gradient-x-success white media-body">
                                <h5>0</h5>
                                <p className="text-bold-400 mb-0">
                                  Active Invoices
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

            <section id="image-grid" className="app-content card">
              <div className="card-header">
                <h4 className="card-title">Image gallery</h4>
                <a className="heading-elements-toggle">
                  <i className="fa fa-ellipsis-v font-medium-3"></i>
                </a>
                <div className="heading-elements">
                  <ul className="list-inline mb-0">
                    <li>
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-block"
                          data-toggle="modal"
                          data-target="#bootstrap"
                        >
                          Add Gallery
                        </button>

                        <div
                          className="modal fade text-left"
                          id="bootstrap"
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="myModalLabel35"
                          aria-hidden="true"
                          style={{ display: "none" }}
                        >
                          <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h3 className="card-title">Download from Dropbox & Add in Gallery</h3>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                              <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                  <fieldset className="form-group floating-label-form-group">
                                    <label htmlFor="title">Title *</label>
                                    <input
                                      type="text"
                                      placeholder="Enter Title"
                                      className="form-control"
                                      name="title"
                                      value={formData.title}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </fieldset>
                                  <fieldset className="form-group floating-label-form-group">
                                    <label>Clients</label>
                                    <select
                                      className="select2 form-control"
                                      name="client"
                                      required
                                      onChange={handleInputChange}
                                      value={formData.client}
                                    >
                                      {clients && clients.map(item => (
                                        <option key={item.id} value={item.name}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </select>
                                  </fieldset>
                                  <fieldset className="form-group floating-label-form-group">
                                    <label htmlFor="address">Address</label>
                                    <input
                                      type="text"
                                      placeholder="Enter Address"
                                      className="form-control"
                                      name="address"
                                      value={formData.address}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </fieldset>
                                  <fieldset className="form-group floating-label-form-group">
                                    <label
                                      htmlFor="services"
                                      style={{ width: "10rem" }}
                                    >
                                      Services
                                    </label>
                                    <Select
                                      className="select2 w-100"
                                      name="services"
                                      defaultValue={formData.services}
                                      onChange={handleSelectedChange}
                                      options={services.map((pkg) => ({
                                        label: pkg.package_name,
                                        value: pkg.id,
                                        package_price: pkg.package_price,
                                      }))}
                                      isSearchable
                                      isMulti
                                      hideSelectedOptions
                                      required
                                      components={{
                                        Option: ({
                                          data,
                                          innerRef,
                                          innerProps,
                                        }) => (
                                          <div
                                            ref={innerRef}
                                            {...innerProps}
                                            style={{ display: 'flex form-select ', alignItems: 'center' }}
                                          >
                                            <img
                                              src={toolIcons}
                                              className="mr-1 ml-1"
                                              width={"14px"}
                                              height={"14px"}
                                              alt=""
                                            />
                                            <span>{data.label}</span>
                                          </div>
                                        ),
                                      }}
                                    />
                                  </fieldset>

                                  <fieldset className="form-group floating-label-form-group">
                                    <label htmlFor="link">
                                      Dropbox Link
                                    </label>
                                    <textarea
                                      className="form-control"
                                      id="link"
                                      rows="1"
                                      placeholder="Link"
                                    ></textarea>
                                  </fieldset>
                                  <fieldset className="form-group floating-label-form-group">
                                    <label htmlFor="link">
                                      Vimeo Video Link
                                    </label>
                                    <textarea
                                      className="form-control"
                                      id="link"
                                      rows="1"
                                      placeholder="Link"
                                    ></textarea>
                                  </fieldset>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label>Banner</label>
                                        <input
                                          type="file"
                                          className="form-control-file"
                                          name="banner"
                                          onChange={handleBannerChange}
                                          accept="image/*"
                                        />
                                        {formData.id && <img src={`${formData.banner ? `${IMAGE_URL}/${formData.banner}` : '../../../app-assets/images/portrait/medium/avatar-m-4.png'}`} className="rounded-circle height-150 mt-2" alt="Card image" />}
                                      </div>
                                    </div>
                                    <fieldset className="form-group floating-label-form-group">
                                      <label>Status *</label>
                                      <select
                                        className="select2 form-control"
                                        name="status"
                                        required
                                        onChange={handleInputChange}
                                        value={formData.status}
                                      >
                                        <option value="off">Off</option>
                                        <option value="on">On</option>
                                      </select>
                                    </fieldset>
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <input
                                    type="submit"
                                    className="btn btn-primary btn"
                                    value="Download"
                                  />
                                  <input
                                    type="reset"
                                    className="btn btn-secondary btn"
                                    data-dismiss="modal"
                                    value="Close"
                                  />
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-content collapse show">
                <div
                  className="card-body my-gallery"
                  itemScope
                  itemType="http://schema.org/ImageGallery"
                >
                  <div className="card-deck-wrapper">
                    <div className="card-deck">
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
                        itemProp="associatedMedia"
                        itemScope
                        itemType="http://schema.org/ImageObject"
                      >
                        <a
                          href="../../../app-assets/images/gallery/1.jpg"
                          itemProp="contentUrl"
                          data-size="480x360"
                        >
                          <img
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/1.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 1</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
                        itemProp="associatedMedia"
                        itemScope
                        itemType="http://schema.org/ImageObject"
                      >
                        <a
                          href="../../../app-assets/images/gallery/2.jpg"
                          itemProp="contentUrl"
                          data-size="480x360"
                        >
                          <img
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/2.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 2</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
                        itemProp="associatedMedia"
                        itemScope
                        itemType="http://schema.org/ImageObject"
                      >
                        <a
                          href="../../../app-assets/images/gallery/3.jpg"
                          itemProp="contentUrl"
                          data-size="480x360"
                        >
                          <img
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/3.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 3</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
                        itemProp="associatedMedia"
                        itemScope
                        itemType="http://schema.org/ImageObject"
                      >
                        <a
                          href="../../../app-assets/images/gallery/4.jpg"
                          itemProp="contentUrl"
                          data-size="480x360"
                        >
                          <img
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/4.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 4</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                    </div>
                  </div>

                  <div className="card-deck-wrapper">
                    <div className="card-deck mt-1">
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
                        itemProp="associatedMedia"
                        itemScope
                        itemType="http://schema.org/ImageObject"
                      >
                        <a
                          href="../../../app-assets/images/gallery/5.jpg"
                          itemProp="contentUrl"
                          data-size="480x360"
                        >
                          <img
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/5.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 5</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
                        itemProp="associatedMedia"
                        itemScope
                        itemType="http://schema.org/ImageObject"
                      >
                        <a
                          href="../../../app-assets/images/gallery/6.jpg"
                          itemProp="contentUrl"
                          data-size="480x360"
                        >
                          <img
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/6.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 6</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
                        itemProp="associatedMedia"
                        itemScope
                        itemType="http://schema.org/ImageObject"
                      >
                        <a
                          href="../../../app-assets/images/gallery/7.jpg"
                          itemProp="contentUrl"
                          data-size="480x360"
                        >
                          <img
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/7.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 7</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
                        itemProp="associatedMedia"
                        itemScope
                        itemType="http://schema.org/ImageObject"
                      >
                        <a
                          href="../../../app-assets/images/gallery/8.jpg"
                          itemProp="contentUrl"
                          data-size="480x360"
                        >
                          <img
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/8.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 4</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                    </div>
                  </div>

                  <div className="card-deck-wrapper">
                    <div className="card-deck mt-1">
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
                        itemProp="associatedMedia"
                        itemScope
                        itemType="http://schema.org/ImageObject"
                      >
                        <a
                          href="../../../app-assets/images/gallery/9.jpg"
                          itemProp="contentUrl"
                          data-size="480x360"
                        >
                          <img
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/9.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 9</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
                        itemProp="associatedMedia"
                        itemScope
                        itemType="http://schema.org/ImageObject"
                      >
                        <a
                          href="../../../app-assets/images/gallery/10.jpg"
                          itemProp="contentUrl"
                          data-size="480x360"
                        >
                          <img
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/10.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 10</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
                        itemProp="associatedMedia"
                        itemScope
                        itemType="http://schema.org/ImageObject"
                      >
                        <a
                          href="../../../app-assets/images/gallery/11.jpg"
                          itemProp="contentUrl"
                          data-size="480x360"
                        >
                          <img
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/11.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 11</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
                        itemProp="associatedMedia"
                        itemScope
                        itemType="http://schema.org/ImageObject"
                      >
                        <a
                          href="../../../app-assets/images/gallery/12.jpg"
                          itemProp="contentUrl"
                          data-size="480x360"
                        >
                          <img
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/12.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 12</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                    </div>
                  </div>
                </div>

                <div
                  className="pswp"
                  tabIndex="-1"
                  role="dialog"
                  aria-hidden="true"
                >
                  <div className="pswp__bg"></div>

                  <div className="pswp__scroll-wrap">
                    <div className="pswp__container">
                      <div className="pswp__item"></div>
                      <div className="pswp__item"></div>
                      <div className="pswp__item"></div>
                    </div>

                    <div className="pswp__ui pswp__ui--hidden">
                      <div className="pswp__top-bar">
                        <div className="pswp__counter"></div>

                        <button
                          className="pswp__button pswp__button--close"
                          title="Close (Esc)"
                        ></button>

                        <button
                          className="pswp__button pswp__button--share"
                          title="Share"
                        ></button>

                        <button
                          className="pswp__button pswp__button--fs"
                          title="Toggle fullscreen"
                        ></button>

                        <button
                          className="pswp__button pswp__button--zoom"
                          title="Zoom in/out"
                        ></button>

                        <div className="pswp__preloader">
                          <div className="pswp__preloader__icn">
                            <div className="pswp__preloader__cut">
                              <div className="pswp__preloader__donut"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                        <div className="pswp__share-tooltip"></div>
                      </div>

                      <button
                        className="pswp__button pswp__button--arrow--left"
                        title="Previous (arrow left)"
                      ></button>

                      <button
                        className="pswp__button pswp__button--arrow--right"
                        title="Next (arrow right)"
                      ></button>

                      <div className="pswp__caption">
                        <div className="pswp__caption__center"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <h4 className="card-title assigned_gallery">Your Orders</h4>
            <div className="users-list-table">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    {/* datatable start */}
                    <div className="table-responsive">
                      <table class="table table-striped table-bordered zero-configuration">
                        <thead>
                          <tr>
                            <th>Order.No.</th>
                            <th>Date</th>
                            <th>Collection Name</th>
                            <th>Package Name</th>
                            <th>Package Price</th>
                            <th>Extras</th>
                            <th>Extras Price</th>
                            <th>Total Price</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>300</td>
                            <td>23/03/2024</td>
                            <td>
                              <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                dean3004
                              </a>
                            </td>
                            <td>package1</td>
                            <td>$15</td>
                            <td>$5</td>
                            <td>$5</td>
                            <td>$25</td>
                            <td>
                              <button class="btn btn-sm btn-outline-secondary mr-1 mb-1" title="Edit">
                                <i className="fa fa-pencil"></i>
                              </button>
                              <button class="btn btn-sm btn-outline-danger mr-1 mb-1" title="Delete">
                                <i className="fa fa-remove"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>301</td>
                            <td>23/03/2024</td>
                            <td>
                              <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                zena0604
                              </a>
                            </td>
                            <td>package2</td>
                            <td>$15</td>
                            <td>$5</td>
                            <td>$5 </td>
                            <td>$25</td>
                            <td>
                              <button class="btn btn-sm btn-outline-secondary mr-1 mb-1" title="Edit">
                                <i className="fa fa-pencil"></i>
                              </button>
                              <button class="btn btn-sm btn-outline-danger mr-1 mb-1" title="Delete">
                                <i className="fa fa-remove"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
    </>
  );
};
