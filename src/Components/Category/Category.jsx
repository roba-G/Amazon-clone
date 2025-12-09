import React from 'react'
import { categoryImage } from './CategoryFullInfo'
import style from './category.module.css'
import CategoryCard from './CategoryCard'

function Category() {
  return (
    <div className={style.category_container}>
      {categoryImage.map((info, i) => {
        return <CategoryCard data={info} key = {i} />
      })}
    </div>
  )
}

export default Category
