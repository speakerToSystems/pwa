document.addEventListener('DOMContentLoaded', () => {
    // Elements to display parameter values
    const adjValue = document.getElementById('adjValue');
    const nounValue = document.getElementById('nounValue');
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const adj = urlParams.get('adj');
    const noun = urlParams.get('noun');
    
    // Display parameters if they exist
    if (adj) {
        adjValue.textContent = adj;
    } else {
        adjValue.textContent = 'No adjective parameter found';
    }
    
    if (noun) {
        nounValue.textContent = noun;
    } else {
        nounValue.textContent = 'No noun parameter found';
    }
});
