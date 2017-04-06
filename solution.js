/**
 * Table class
 */
var Table = function () {
    this.data    = [];
    this.headers = [];
    this.table   = null;
    this.warpperId = null;
    this.sortKey = false

    /**
     * Init table
     * 
     * @param  {string} warpperId for table container
     * @return {void}
     */
    this.init = function(warpperId) {
        this.warpperId = warpperId;
    }

    /**
     * Set table data
     * 
     * @param {Array<Object>} data
     * @return {void}
     */
    this.setData = function(data) {
        this.data = data;
    }

    /**
     * Set sort key
     * 
     * @param {string} sortKey
     */
    this.setSortKey = function(sortKey) {
        this.sortKey = sortKey;
    }

    /**
     * Render table
     * 
     * @return {void}
     */
    this.renderTable = function() {

        if(this.data.length === 0) {
            document.getElementById(this.warpperId).innerHTML = 'No records found';
            return;
        }

        this.setHeader();
        this.createTable();
    }

    /**
     * Set header
     * Find object with max property from array
     * And set as header
     *
     * @return {void} [description]
     */
    this.setHeader = function() {

        var _maxKeyObject = this.data.reduce(function(obj1, obj2){
            return Object.keys(obj2).length > Object.keys(obj1).length ? obj2 : obj1;
        });

        this.headers = Object.keys(_maxKeyObject);
    }

    /**
     * Create table
     * 
     * @return {void}
     */
    this.createTable = function() {

        this.table  = document.createElement('table');
        var _header = this.getHeaderElement();
        var _rows   = this.getDataElements();
        this.table.appendChild(_header);
        this.table.appendChild(_rows);
        document.getElementById(this.warpperId).appendChild(this.table);
    }

    /**
     * Get table header
     * 
     * @return {HTMLElement}
     */
    this.getHeaderElement = function() {

        var _thead = document.createElement('thead');
        var _tr = document.createElement('tr');

        this.headers.forEach(function(value, index) {
            var _th = document.createElement('th');
            _th.innerHTML = value.replace(/(_)/g, ' ');
            _th.setAttribute('sortProp', value);
            _th.addEventListener('click', function(event) {
                this.onSort(event, this);
            }.bind(this));
            _tr.appendChild(_th);
        }.bind(this));

        _thead.appendChild(_tr);

        return _thead
    }

    /**
     * Get table body
     * 
     * @return {HTMLEelemt}
     */
    this.getDataElements = function() {

        var _tbody = document.createElement('tbody');
        if(this.sortKey) {
            this.data.sort(function(a, b) {

                if(typeof a[this.sortKey] == 'undefined') {
                    a[this.sortKey] = isNaN(b[this.sortKey]) ? '-' : false;
                }
                if(typeof b[this.sortKey] == 'undefined') {
                    b[this.sortKey] = isNaN(a[this.sortKey]) ? '-' : false;
                }

                if( isNaN(a[this.sortKey]) && typeof a[this.sortKey] != 'undefined' ) {
                    var _stirng1 = (a[this.sortKey]) ? a[this.sortKey].toLowerCase() : '';
                    var _stirng2 = (b[this.sortKey]) ? b[this.sortKey].toLowerCase() : '';

                    return _stirng1 < _stirng2 ? 1 : -1;
                }

                var _number1 = (a[this.sortKey]) ? parseFloat(a[this.sortKey]) : 0;
                var _number2 = (b[this.sortKey]) ? parseFloat(b[this.sortKey]) : 0;

                return _number1 < _number2 ? 1 : -1;
            }.bind(this));
        }
        this.data.forEach(function(row) {
            _tbody.appendChild(this.getRowElements(row));
        }.bind(this));

        return _tbody;
    }

    /**
     * Get row element
     * 
     * @param  {Object} row
     * @return {HTMLElement}
     */
    this.getRowElements = function(row) {

        var _tr = document.createElement('tr');
        this.headers.forEach(function(key) {
            var _td = document.createElement('td');
            _td.innerHTML = row[key] || '-';
            _tr.appendChild(_td);
        }.bind(this));

        return _tr;
    }

    /**
     * Sort column
     * @param  {MouseEvent} event
     * @param  {Table} _this
     * @return {void}
     */
    this.onSort = function(event, _this) {
        var _sortKey = event.target.getAttribute('sortProp');
        if(_sortKey != _this.sortKey) {
            _this.setSortKey(_sortKey);
            var _rows   = this.getDataElements();
            var _table = event.target.offsetParent;

            _table.removeChild(_table.childNodes[1]);
            _table.appendChild(_rows);
        }
    }
};



function loadTables() {

    this.loadCompanies();
    this.loadUsers();
}

function loadCompanies() {

    var _data = [ { "company_name":"Medline Industries, Inc.", "product":"Benzalkonium Chloride", "price":"481.63" }, { "company_name":"PD-Rx Pharmaceuticals, Inc.", "product":"Alprazolam", "price":"167.62", "fda_date_approved":"02/12/2015" }, { "company_name":"West-ward Pharmaceutical Corp.", "product":"Flumazenil", "fda_date_approved":"23/04/2015" }, { "company_name":"HyVee Inc", "product":"Aspirin", "price":"218.32", "fda_date_approved":"26/07/2015" }, { "company_name":"Aurobindo Pharma Limited", "product":"carisoprodol", "price":"375.58", "fda_date_approved":"28/11/2014" }, { "company_name":"Apotex Corp", "product":"Risperidone", "price":"213.49", "fda_date_approved":"06/11/2015" }, { "company_name":"Unit Dose Services", "product":"Lovastatin", "price":"169.14", "fda_date_approved":"14/09/2015" }, { "company_name":"Jubilant HollisterStier LLC", "product":"Dog Hair Canis spp.", "fda_date_approved":"31/12/2014" }, { "company_name":"AAA Pharmaceutical, Inc.", "product":"ACETAMINOPHEN, CHLORPHENIRAMINE MALEATE, DEXTROMETHORPHAN HYDROBROMIDE, and PHENYLEPHRINE HYDROCHLORIDE", "price":"183.33", "fda_date_approved":"13/12/2015" }, { "company_name":"AKG Innovations LLC", "product":"AVOBENZONE, OCTINOXATE, OCTISALATE", "fda_date_approved":"22/01/2015" }, { "company_name":"hikma Farmaceutica", "product":"Oxytocin" }, { "company_name":"prime Packaging, Inc.", "product":"Avobenzone, Homosalate, Octisalate, Octocrylene, Oxybenzone", "price":"208.17" }, { "company_name":"Davion, Inc", "product":"Triclosan", "price":"80.30", "fda_date_approved":"13/12/2014" }, { "company_name":"CARDINAL HEALTH", "product":"CARBOXYMETHYLCELLULOSE SODIUM, GLYCERIN", "price":"330.22", "fda_date_approved":"11/08/2015" }, { "company_name":"Amgen Inc", "product":"darbepoetin alfa", "price":"332.28", "fda_date_approved":"01/07/2015" }, { "company_name":"Autumn Harp, Inc.", "product":"Salicylic Acid", "price":"34.43", "fda_date_approved":"25/03/2015" }, { "company_name":"American Regent, Inc.", "product":"sodium phosphate, monobasic, monohydrate and sodium phosphate, dibasic anhydrous", "price":"11.60" }, { "company_name":"J. A. Cosmetics U.S. INC", "product":"TITANIUM DIOXIDE", "price":"130.90", "fda_date_approved":"01/12/2015" }, { "company_name":"NATURE REPUBLIC CO., LTD.", "product":"Titanium Dioxide, OCTINOXATE, Zinc Oxide", "price":"124.48" }, { "company_name":"L. Perrigo Company", "product":"Dextromethorphan Hydrobromide, Guaifenesin", "price":"73.09", "fda_date_approved":"03/02/2016" } ];
    var _table = new Table();
    _table.init('companies-table');
    _table.setData(_data);
    _table.renderTable();
}

function loadUsers() {

    var _data = [{ "first_name": "Billy", "last_name": "Campbell", "phone": "62-(500)527-5325" }, { "first_name": "Jonathan", "last_name": "Black", "country": "Russia", "phone": "7-(729)811-4597" }, { "first_name": "cheryl", "last_name": "Harvey", "country": "Indonesia", "phone": "62-(825)454-3810" }, { "first_name": "Cynthia", "last_name": "Cooper" }, { "first_name": "Thomas", "last_name": "Stevens", "phone": "86-(527)535-8464" }, { "first_name": "Jane", "last_name": "Chavez", "country": "Netherlands" }, { "first_name": "bobby", "last_name": "Price", "country": "China", "phone": "86-(898)723-6749" }, { "first_name": "Steve", "last_name": "Hansen", "phone": "93-(362)494-5552" }, { "first_name": "Alan", "last_name": "Cruz", "country": "Philippines", "phone": "63-(617)248-8832" }, { "first_name": "Dennis", "last_name": "Baker", "country": "Iran", "phone": "98-(436)329-3723" }, { "first_name": "Ernest", "last_name": "Bishop", "phone": "86-(566)429-1138" }, { "first_name": "Russell", "last_name": "Meyer", "phone": "62-(687)827-4302" }, { "first_name": "Ryan", "last_name": "Mendoza", "country": "Poland", "phone": "48-(537)109-0373" }, { "first_name": "Maria", "last_name": "Greene", "phone": "92-(831)367-8049" }, { "first_name": "Elizabeth", "last_name": "Moore", "country": "Philippines", "phone": "63-(694)844-9255" }, { "first_name": "Ronald", "last_name": "kim", "phone": "46-(339)931-9221" }, { "first_name": "Samuel", "last_name": "Jacobs", "country": "Russia", "phone": "7-(936)156-5229" }, { "first_name": "Fred", "last_name": "Ross", "phone": "55-(594)481-7354" }, { "first_name": "Andrew", "last_name": "Burns", "country": "Portugal", "phone": "351-(174)443-8706" }, { "first_name": "Robert", "last_name": "Frazier", "country": "Somalia" }];
    var _table = new Table();
    _table.init('user-table');
    _table.setData(_data);
    _table.renderTable();
}