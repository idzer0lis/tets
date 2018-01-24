//== Class definition

var DatatableRemoteAjaxDemo = function () {
  //== Private functions

  // basic demo
  var demo = function () {

    var datatable = $('#site_users_datatable').mDatatable({
      // datasource definition
      data: {
        type: 'remote',
        source: {
          read: {
            // sample GET method
            method: 'GET',
            url: '/site-users/data',
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
        saveState: {
          cookie: false,
          webstorage: false,
        },
        serverPaging: true,
        serverFiltering: true,
        serverSorting: false,
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
          field: 'email',
          title: 'Email',
          sortable: false, // default sort
          // filterable: false, // disable or enable filtering
          width: 300,
          // basic templating support for column rendering,
        }, {
          field: 'activated_at',
          title: 'Activated',
          sortable: false, // default sort
          // filterable: false, // disable or enable filtering
          width: 100,
          template: function (row) {
            var status = {
              1: {'title': 'Active', 'class': 'm-badge--success'},
              0: {'title': 'Inactive', 'class': ' m-badge--danger'},
            };
            return '<span class="m-badge ' + status[row.activated].class + ' m-badge--wide">' + status[row.activated].title + '</span>';
          }
        }, {
          field: 'Actions',
          width: 110,
          title: 'Actions',
          sortable: false,
          overflow: 'visible',
          template: function (row) {
            let resendEmailButton = '';
            let activateSiteUserButton = '';
            let deactivateSiteUserButton = '';

            if (row.activated === '0') {
              activateSiteUserButton = '<form action="/site-users/activate/' + row.site_user_id + '" method="post" class="form-inline m--block-inline">\
                                      <input type="hidden" name="_csrf" value="'+ window.csrfToken +'">\
                                      <button type="submit" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Activate site user">\
                                        <i class="fa fa-check-square-o"></i>\
                                      </button>\
                                   </form>';
              resendEmailButton = '<form action="/site-users/resend-activation-email/' + row.site_user_id + '" method="post" class="form-inline m--block-inline">\
                                      <input type="hidden" name="_csrf" value="'+ window.csrfToken +'">\
                                      <button type="submit" class="m-portlet__nav-link btn m-btn m-btn--hover-success m-btn--icon m-btn--icon-only m-btn--pill" title="Resend activation email">\
                                        <i class="fa fa-send"></i>\
                                      </button>\
                                   </form>';
            }

            if (row.activated === '1') {
              deactivateSiteUserButton = '<form action="/site-users/deactivate/' + row.site_user_id + '" method="post" class="form-inline m--block-inline">\
                                      <input type="hidden" name="_csrf" value="'+ window.csrfToken +'">\
                                      <button type="submit" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Deactivate site user">\
                                        <i class="fa fa-ban"></i>\
                                      </button>\
                                   </form>';
            }

            return '\
                   '+ activateSiteUserButton +' \
                   '+ resendEmailButton +' \
                   '+ deactivateSiteUserButton +' \
					';
          },
        }
        ],
    });

    var query = datatable.getDataSourceQuery();

    $('#m_form_status').on('change', function () {
      var query = datatable.getDataSourceQuery();
      console.log($(this).val());
      if ($(this).val() === '1') {
        query['activated_at'] = 'is not null';
      } else if ($(this).val() === '0') {
        query['activated_at'] = 'is null';
      } else {
        query['activated_at'] = '';
      }
      datatable.setDataSourceQuery(query);
      datatable.load();
    }).val(typeof query.Type !== 'undefined' ? query.Type : '');

    $('#m_form_status').selectpicker();

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
