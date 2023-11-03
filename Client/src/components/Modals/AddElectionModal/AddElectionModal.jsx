import React from 'react';
import AddElection from '../../AddElection';

const AddElectionModal = ({
	election,
	setElection,
	handleAddElection,
}) => {
	return (
		<div
			className="modal fade"
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			tabIndex="-1"
			aria-labelledby="staticBackdropLabel"
			aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1
							className="modal-title fs-5"
							id="staticBackdropLabel">
							Add Election
						</h1>
						<button
							type="button"
							className="btn-close"></button>
					</div>
					<div className="modal-body">
						<AddElection
							// constituencies={constituencies}
							election={election}
							setElection={setElection}
						/>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							data-bs-dismiss="modal">
							Close
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => handleAddElection()}>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddElectionModal;
