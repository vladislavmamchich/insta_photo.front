import React, { PureComponent } from 'react'
import Dropzone from 'react-dropzone'
import { toast } from 'react-toastify'
import i18next from 'i18next'

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
				accept={['.jpg', '.png', '.jpeg']}
				multiple={false}
				onDrop={onDrop}
				onDropRejected={() =>
					toast.error(i18next.t('Invalid file format or size'))
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
						<span>{i18next.t('choose')}...</span>
						<input {...getInputProps()} />
					</label>
				)}
			</Dropzone>
		)
	}
}

export default ImageUpload
