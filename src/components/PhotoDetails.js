import React, { Fragment } from "react";

function PhotoDetails({ data, onClickSave, showEditForm }) {
  let id = data.id;
  
  return (
    data && (
      <Fragment>
        <figure style={{ textAlign: "center" }}>
          <img className="large" src={data.uri} alt={data.name} key={data.id} />
        </figure>
        <div className="details-container">
          <table>
            <tbody>
              <tr>
                <td>
                  <p>Name</p>
                </td>
                <td>
                  <p>{data.name}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Description</p>
                </td>
                <td>
                  <p>{data.description}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Characteristics</p>
                </td>
                <td>
                  <p>{data.personality}</p>
                </td>
              </tr>
            </tbody>
          </table>

          <span
            id="edit-link"
            className="clickable pb-2"
            onClick={() => {
              showEditForm();
            }}
          >
            [Screw this I'm gonna change it]
          </span>

          <div id="edit-wrapper" className="hidden">
            <h2>Edit data</h2>
            <form
              onSubmit={event => {
                event.preventDefault();

                const form = event.target;
                const elements = form.elements;
                const title = elements.name.value;
                const caption = elements.caption.value;

                onClickSave({ title, caption, id });
                showEditForm();
              }}
            >
              <div className="editfield">
                <label>Title</label>
                <input type="text" name="title" className="mb-2" defaultValue={data.name} />
                <label>Caption</label>
                <textarea className="mb-2" name="caption" defaultValue={data.description} />
              </div>
              <button className="mb-2">Save changes</button>
            </form>
          </div>
        </div>
      </Fragment>
    )
  );
}

export default PhotoDetails;
