import React, { PureComponent } from 'react'
import Dropzone from 'react-dropzone'
import { toast } from 'react-toastify'

class ImageUpload extends PureComponent {
	// _render = (getRootProps, getInputProps) => {
	// 	return (
	// 		<label
	// 			{...getRootProps()}
	// 			onClick={e => {
	// 				e.preventDefault()
	// 			}}
	// 			className="btn btn-outline-light"
	// 		>
	// 			<span>choose...</span>
	// 			<input {...getInputProps()} />
	// 		</label>
	// 	)
	// }

	render() {
		const { onDrop } = this.props
		return (
			<Dropzone
				// maxSize={1024 * 1024}
				accept={['.jpg', '.png']}
				multiple={false}
				onDrop={onDrop}
				onDropRejected={() =>
					toast.error('Неверный формат или размер файла')
				}
				disableClick={false}
			>
				{({ getRootProps, getInputProps, open }) => (
					<label
						{...getRootProps()}
						onClick={e => {
							e.preventDefault()
							open(e)
						}}
						className="btn btn-outline-light"
					>
						<span>choose...</span>
						<input {...getInputProps()} />
					</label>
				)}
			</Dropzone>
		)
	}
}

export default ImageUpload
