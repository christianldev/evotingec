import React, {useState} from 'react';

const AddElection = ({
	// constituencies,
	election,
	setElection,
}) => {
	const [description, setDescription] = useState('');

	return (
		<div className="container">
			<form>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label>
								Fecha de Inicio
								<sup className="fas fa-asterisk fw-normal text-danger"></sup>
							</label>
							<div className="cal-icon">
								<input
									name="start"
									id="sd"
									type="datetime-local"
									className="form-control"
									placeholder="date of Joining"
									value={election.startDate}
									onChange={(event) =>
										setElection({
											...election,
											startDate: event.target.value,
										})
									}
									required
								/>
							</div>
						</div>
					</div>

					<div className="col-md-6">
						<div className="form-group">
							<label>
								Fecha de finalizacion
								<sup className="fas fa-asterisk fw-normal text-danger"></sup>
							</label>
							<div className="cal-icon">
								<input
									name="end"
									id="ed"
									type="datetime-local"
									className="form-control"
									placeholder="date of Joining"
									value={election.endDate}
									onChange={(event) => {
										setElection({
											...election,
											endDate: event.target.value,
										});
									}}
									required
								/>
							</div>
						</div>
					</div>

					<div className="col-12 col-md-6 mt-2">
						<div className="form-group">
							<label>
								Descripcion
								<sup className="fas fa-asterisk fw-normal text-danger"></sup>
							</label>
							<input
								name="constituency"
								id="spec"
								className="form-control"
								list="datalistOptions"
								placeholder="Descripcion de la eleccion"
								value={description}
								onChange={(event) => {
									setDescription(event.target.value);
									setElection({
										...election,
										description: event.target.value,
									});
								}}
							/>
							{/* <datalist
								id="datalistOptions"
								className="bg-light">
								{constituencies.map(
									(constituency, index) => (
										<option
											value={constituency.id}
											key={index}>
											{constituency.name}
										</option>
									)
								)}
							</datalist> */}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddElection;
