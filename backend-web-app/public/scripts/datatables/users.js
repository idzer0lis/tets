//== Class definition

var DatatableRemoteAjaxDemo = function () {
  //== Private functions

  // basic demo
  var demo = function () {

    var datatable = $('#users_datatable').mDatatable({
      // datasource definition
      data: {
        type: 'remote',
        source: {
          read: {
            // sample GET method
            method: 'GET',
            url: '/users/data',
            map: function (raw) {
              // sample data mapping
              var dataSet = raw;
              if (typeof raw.data !== 'undefined') {
                dataSet = raw.data;
              }
              return dataSet;
            },
          },
        },
        pageSize: 10,
        // saveState: {
        //   cookie: true,
        //   webstorage: true,
        // },
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true,
      },

      // layout definition
      layout: {
        theme: 'default', // datatable theme
        class: '', // custom wrapper class
        scroll: true, // enable/disable datatable scroll both horizontal and vertical when needed.
        footer: false // display/hide footer
      },

      // column sorting
      sortable: true,

      pagination: true,

      toolbar: {
        // toolbar items
        items: {
          // pagination
          pagination: {
            // page size select
            pageSizeSelect: [10, 20, 30, 50, 100],
          },
        },
      },

      search: {
        input: $('#generalSearchInput'),
      },

      // columns definition
      columns: [
        {
          field: 'first_name',
          title: 'First Name',
          // sortable: 'asc', // default sort
          filterable: false, // disable or enable filtering
          width: 150,
          // basic templating support for column rendering,
        }, {
          field: 'last_name',
          title: 'Last Name',
          // sortable: 'asc', // default sort
          filterable: false, // disable or enable filtering
          width: 150,
          // basic templating support for column rendering,
        }, {
          field: 'email',
          title: 'Email',
          // sortable: 'asc', // default sort
          filterable: false, // disable or enable filtering
          width: 300,
          // basic templating support for column rendering,
        }, {
          field: 'role_description',
          title: 'User Role Description',
          // sortable: 'asc', // default sort
          filterable: false, // disable or enable filtering
          width: 200,
          // basic templating support for column rendering,
        }, {
          field: 'Actions',
          width: 110,
          title: 'Actions',
          sortable: false,
          overflow: 'visible',
          template: function (row) {
            // var dropup = (row.getDatatable().getPageSize() - row.getIndex()) <= 4 ? 'dropup' : '';
            let resendEmailButton = '';

            if (row.activated_at === null) {
              resendEmailButton = '<form action="/users/resend-activation-email/' + row.user_id + '" method="post" class="form-inline m--block-inline">\
                                      <input type="hidden" name="_csrf" value="'+ window.csrfToken +'">\
                                      <button type="submit" class="m-portlet__nav-link btn m-btn m-btn--hover-success m-btn--icon m-btn--icon-only m-btn--pill" title="Resend activation email">\
                                        <i class="fa fa-send"></i>\
                                      </button>\
                                   </form>';
            }

            return '\
						       <a href="/users/user-ips/' + row.user_id + '" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="User IPs">\
                     <i class="la la-list-ul"></i> \
                   </a>\
                   '+ resendEmailButton +' \
					';
          },
        }
        ],
    });

    var query = datatable.getDataSourceQuery();

    /*
    $('#m_form_status').on('change', function () {
      // shortcode to datatable.getDataSourceParam('query');
      var query = datatable.getDataSourceQuery();
      query.Status = $(this).val().toLowerCase();
      // shortcode to datatable.setDataSourceParam('query', query);
      datatable.setDataSourceQuery(query);
      datatable.load();
    }).val(typeof query.Status !== 'undefined' ? query.Status : '');
    */

    $('#m_form_type').on('change', function () {
      // shortcode to datatable.getDataSourceParam('query');
      var query = datatable.getDataSourceQuery();
      query['role.role_code'] = $(this).val();
      // shortcode to datatable.setDataSourceParam('query', query);
      datatable.setDataSourceQuery(query);
      datatable.load();
    }).val(typeof query.Type !== 'undefined' ? query.Type : '');

    $('#m_form_status, #m_form_type').selectpicker();

  };

  return {
    // public functions
    init: function () {
      demo();
    },
  };
}();

jQuery(document).ready(function () {
  DatatableRemoteAjaxDemo.init();
});
