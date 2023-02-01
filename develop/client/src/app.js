import ImageSlider from './components/Slider/imageSlider'
const App = () => {
    const slides = [
        {url: 'https://ftw.usatoday.com/wp-content/uploads/sites/90/2021/12/gta-online-the-contract-key-art.jpg?w=1000&h=600&crop=1', title: 'GTA5'},
        {url: 'https://assets.reedpopcdn.com/mafia-definitive-edition-review-a-generous-remake-that-still-shows-some-age-1600945390305.jpg/BROK/thumbnail/1600x900/quality/100/mafia-definitive-edition-review-a-generous-remake-that-still-shows-some-age-1600945390305.jpg', title: 'MAFIA'},
        {url: 'https://images4.alphacoders.com/720/thumb-1920-720203.jpg', title: 'DAYS GONE'},
        {url: 'https://twistedvoxel.com/wp-content/uploads/2021/01/ghost-recon-breakpoint-update.jpg', title: 'BREAKPOINT'},
        {url: 'https://cdn.mos.cms.futurecdn.net/THQywijPnGtYYQ9GGYNnu8-1200-80.jpg', title: 'THE LAST OF US'}
    ]
    const constainerStyles = {
        width: '500px',
        height: '280px',
        margin: '0 auto'

    }
    return (
        <div>
            <h1>Its working</h1>
            <div style={constainerStyles}>
            <ImageSlider slides={slides}/>
            </div>
        </div>
    );
};
 export default App