(function() {
    "use strict";

    function JavaScript() {
        let url;
        let removeId = document.getElementsByClassName('removeFromCart');
        this.init = function() {
            if(removeId) {
                addEventListener();
            }
        }

        let addEventListener = function() {
            document.addEventListener('click', removeItemCart)
        }   

        let removeItemCart = function(e) {
            if(e.target.className === 'removeFromCart') {
                let getItem_id = e.target.getAttribute('id');
                url = 'delete/' + getItem_id;
                delete_item(url, getItem_id);
            }
        }

        function delete_item(url, item_id, callback) {
            let req = new XMLHttpRequest();
            req.open("POST", url, true);
            req.send(item_id);
            req.onload = function() {
                if(this.status == 200 || this.status == 500) {
                    let data = req.responseText;
                    callback(data);
                }
            }
        }
    }

    let javascript = new JavaScript();
    javascript.init();
})();