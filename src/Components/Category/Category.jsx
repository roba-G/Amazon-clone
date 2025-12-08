import React from 'react'
import { categoryImage } from './CategoryFullInfo'
import style from './category.module.css'
import CategoryCard from './CategoryCard'

function Category() {
  return (
    <div className={style.category_container}>
      {categoryImage.map((info) => {
        return <CategoryCard data={info} />
      })}
    </div>
  )
}

export default Category
