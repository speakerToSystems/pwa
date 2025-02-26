document.addEventListener('DOMContentLoaded', () => {
    const scanQrButton = document.getElementById('scanQrButton');
    const qrScanner = document.getElementById('qrScanner');
    const closeScanner = document.getElementById('closeScanner');
    const qrVideo = document.getElementById('qrVideo');
    const scanResult = document.getElementById('scanResult');
    
    let html5QrCode;

    // Open QR scanner
    scanQrButton.addEventListener('click', () => {
        qrScanner.classList.remove('hidden');
        startScanner();
    });

    // Close QR scanner
    closeScanner.addEventListener('click', () => {
        qrScanner.classList.add('hidden');
        stopScanner();
    });

    // Start QR scanner
    function startScanner() {
        // Create a new instance of the scanner
        html5QrCode = new Html5Qrcode("qrVideo");
        
        const config = { 
            fps: 10,
            qrbox: 250
        };
        
        html5QrCode.start(
            { facingMode: "environment" }, 
            config,
            onScanSuccess,
            onScanError
        );
    }

    // Stop QR scanner
    function stopScanner() {
        if (html5QrCode && html5QrCode.isScanning) {
            html5QrCode.stop().catch(error => {
                console.error("Error stopping scanner:", error);
            });
        }
    }

    // Handle successful QR scan
    function onScanSuccess(decodedText) {
        scanResult.textContent = `Decoded: ${decodedText}`;
        
        // Check if the URL is a valid deeplink for our app
        if (decodedText.includes('/pwa/deeplink')) {
            // Stop the scanner
            stopScanner();
            
            // Navigate to the deeplink
            window.location.href = decodedText;
        }
    }

    // Handle QR scan error
    function onScanError(error) {
        // Errors are expected while scanning, so we don't need to handle them explicitly
        console.log("QR scanning in progress...");
    }
});
