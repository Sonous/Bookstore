import React from 'react'
import DetailLayout from './DetailLayout'
import BookDetail from './BookDetail'

function BookDetailPage() {
  return (
    <DetailLayout title="Book Details">
        <BookDetail />
    </DetailLayout>
  )
}

export default BookDetailPage