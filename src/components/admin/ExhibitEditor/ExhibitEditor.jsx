import { mockExhibit } from "../../../utils/mockData/mockExhibits";

import ExhibitCard from "../../ExhibitCard/ExhibitCard";
import "./ExhibitEditor.css";

function ExhibitEditor() {
  return (
    <section className="exhibit-editor">
      <h2 className="exhibit-editor__title">Exhibit Editor</h2>
      <ul className="exhibit-editor__list">
        {mockExhibit.map((exhibit) => (
          <ExhibitCard exhibit={exhibit} key={exhibit._id} variant="admin" />
        ))}
      </ul>
    </section>
  );
}

export default ExhibitEditor;
