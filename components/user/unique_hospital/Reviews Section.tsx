"use client"
import ADD_RATING_MUTATION from '@/services/apollo/mutations/addRating'
import ADD_REVIEW_MUTATION from '@/services/apollo/mutations/addReview'
import GET_UNIQUE_USER from '@/services/apollo/queries/getUniqueUser'
import { useApolloClient, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'

const ReviewsSection = ({ reviews, hospitalId }: { reviews: any[], hospitalId: string }) => {
  const client = useApolloClient() 
  const [sendReview] = useMutation(ADD_REVIEW_MUTATION, {
    context: {
      requiresAuth: true
    }
  })
  const [sendRating] = useMutation(ADD_RATING_MUTATION, {
    context: {
      requiresAuth: true
    }
  })

  const [users, setUsers] = useState<{ [key: string]: any }>({})

  async function getAllReviews() {
    const uniqueAuthors = Array.from(reviews.map(review => review.author))
    const newUsers: { [key: string]: any } = {}
    for (let authorId of uniqueAuthors) {
      try {
        const { data } = await client.query({
          query: GET_UNIQUE_USER,
          variables: { userId: authorId },
          context: {
            requiresAuth: true
          }
        })
        console.log(data)
        // Assuming your query returns data in data.getUserByID
        newUsers[authorId] = data.getUserByID
      } catch (err) {
        console.log(err)
      }
    }
    setUsers(newUsers)
  }

  useEffect(() => {
    getAllReviews()
  }, [reviews])

  async function addReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const content = formData.get("content")
    const rating = formData.get("rating")
    try {
      const { data } = await sendReview({
        variables: { content: content, hospitalId: hospitalId}
      })

      const response = await sendRating({
        variables: {rating: Number(rating), hospitalId: hospitalId}
      }) 
      console.log(data)
      console.log(response.data)
      alert("Review added")
      // Optionally, update your UI with the new review here.
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section id="reviews" className="my-28">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Patient Reviews
          </h2>
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="flex items-center">
              <svg
                className="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.803 2.03a1 1 0 00-.314 1.118l1.07 3.292c.3.92-.755 1.688-1.538 1.118l-2.802-2.03a1 1 0 00-1.18 0l-2.803 2.03c-.783.57-1.838-.198-1.538-1.118l1.071-3.292a1 1 0 00-.314-1.118L3.568 8.72C2.785 8.15 3.187 7.01 4.157 7.01h3.462a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-sm text-gray-600">{reviews.length} Reviews</span>
          </div>
          <p className="mx-auto max-w-3xl text-gray-600">
            Hear what our patients have to say about their experience with us!
          </p>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => {
            const user = users[review.author]
            return (
              <div key={index} className="rounded-xl bg-white p-6 shadow-lg">
                <p className="mb-4 text-gray-700">
                  "{review.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={user?.profilePic || "https://randomuser.me/api/portraits/lego/1.jpg"}
                    alt={user?.name || "Reviewer"}
                    className="mr-3 h-12 w-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {user?.name || "Anonymous"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email || "No Email"}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Add Review Form */}
        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={addReview} className="flex flex-col gap-4">
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Rating (out of 5)
              </label>
              <select
                name="rating"
                id="rating"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                defaultValue=""
              >
                <option value="" disabled>Select Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <textarea
              name="content"
              placeholder="Write your review..."
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              rows={4}
            ></textarea>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
