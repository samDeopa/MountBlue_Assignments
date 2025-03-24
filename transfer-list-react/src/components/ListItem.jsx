const ListItem = ({ uid, labelText, checked, onClickHandler }) => {
  return (
    <div className="flex items-center">
      <label htmlFor={uid}>
        <input
          className="mx-2"
          type="checkbox"
          id={uid}
          checked={checked}
          onChange={(event) => {
            onClickHandler(event);
          }}
        />
        {labelText}
      </label>
    </div>
  );
};
export default ListItem;
