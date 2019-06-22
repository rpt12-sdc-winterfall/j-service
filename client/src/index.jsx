import Image from './image';
import Description from './description';

const flexStyle = {
  display: 'flex'
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.book = {};
    this.state.weightedReviews = 0;

    this.averageReviews = this.averageReviews.bind(this);
    this.calculateBarWidth = this.calculateBarWidth.bind(this);
  }

  componentDidMount() {
    const bookId = window.location.pathname.split('/')[1] || 0;

    fetch(`/books/${bookId}`)
      .then((response) => {
        return response.json();
      })
      .then((book) => {
        console.log("Got book data as :", book);
        const date = new Date(book.publishDate);
        const month = date.toLocaleString('en-us', { month: 'long' });
        const day = date.toLocaleString('en-us', { day: 'numeric' });
        const year = date.toLocaleDateString('en-us', { year: 'numeric' });
        const publishDate = month + ' ' + day + 'th ' + year;
        this.setState({
          book: book,
          weightedReviews: this.averageReviews(book.ratings),
          publishDate: publishDate,
          reviewPercents: this.calculateBarWidth(book.ratings)
        });
      });

  }

  averageReviews(total) {
    const totalReviewValue = (total.five * 5) + (total.four * 4) + (total.three * 3) + (total.two * 2) + (total.one * 1);
    const totalReviews = (total.five + total.four + total.three + total.two + total.one);
    return (totalReviewValue / totalReviews);
  }

  calculateBarWidth(r) {
    const reviews = {...r};
    let topReview = '';
    let topReviewNumber = 0;

    // loop through each review type
    for (let key in reviews) {
      // check for greatest value of reviews
      if (reviews[key] > topReviewNumber) {
        topReviewNumber = reviews[key];
        topReview = key;
      }
    }

    // object for state set
    let reviewPercents = {};

    // 2nd loop - reset new objects to percentages for eventual state set
    for (let key in reviews) {
      if (key === topReview) {
        reviewPercents[key] = '100%';
      } else {
        reviewPercents[key] = parseInt(((reviews[key] / reviews[topReview]) * 100)) + '%';
      }
    }

    return reviewPercents;
  }

  render() {
    return (
      <div style={flexStyle}>
        <Image image={this.state.book.id} />
        <Description
          title={this.state.book.title}
          description={this.state.book.description}
          author={this.state.book.author}
          ratings={{...this.state.book.ratings}}
          reviews={this.state.book.reviews}
          weightedReviews={this.state.weightedReviews}
          links={{...this.state.book.links}}
          pages={this.state.book.pages}
          publishDate={this.state.publishDate}
          publisher={this.state.book.publisher}
          metadata={{...this.state.book.metadata}}
          reviewPercents={{...this.state.reviewPercents}}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  // eslint-disable-next-line no-undef
  document.getElementById('description-app')
);