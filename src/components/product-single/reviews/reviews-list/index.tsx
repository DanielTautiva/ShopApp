import Rater from 'react-rater';
import createMarkup from 'src/utils/markup';
import { ReviewType } from 'src/utils/types';

type ReviewsListType = {
  reviews: ReviewType[];
}

const ReviewsList = ({ reviews }: ReviewsListType) => {

  return (
    <section className="reviews-list">
      {reviews.map((review, index) => (
        <div key={index} className="review-item">
          <div className="review__avatar">
            <img src={ review.avatar } alt="avatar" />
          </div>
          
          <div className="review__content">
            <h3>{ review.name }</h3>
            <Rater total={5} interactive={false} rating={review.punctuation} />
            <div className="review__comment" dangerouslySetInnerHTML={createMarkup(review.description)}>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
  
export default ReviewsList;
    