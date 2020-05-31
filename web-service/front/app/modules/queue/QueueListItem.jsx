import React from 'react'

const QueueListItem = (
  {
    id,
    name,
    onQueueClick,
    onRemoveClick,
    isCurrent,
    removable,
  }) => {
  const handleQueueClick = () => {
    onQueueClick(id)
  }

  const handleRemove = (e) => {
    e.stopPropagation()

    onRemoveClick(id)
  }

  return (
    <div>
      <div
        key={id}
        onClick={handleQueueClick}
      >
        {name}
      </div>
      <If condition={removable && !isCurrent}>
        <div onClick={handleRemove}>
          remove
        </div>
      </If>
    </div>
  )
}

export default QueueListItem
