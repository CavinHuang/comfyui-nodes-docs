---
tags:
- Image
- ImageSave
---

# SaveImageOpenEXR
## Documentation
- Class name: `SaveImageOpenEXR`
- Category: `Marigold`
- Output node: `True`

This node specializes in saving images in the OpenEXR format, catering to the need for high dynamic range (HDR) imaging. It ensures that images are saved with enhanced luminance levels, accommodating a broader spectrum of light and color details. The node is designed to adapt to the system's available resources, ensuring that images are preserved in the desired format with high fidelity.
## Input types
### Required
- **`images`**
    - The images to be saved, expected to be in a NumPy array format. This input is crucial as it directly represents the data that will be processed and saved in the EXR format.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`filename_prefix`**
    - A prefix for the filename under which the image will be saved. This allows for customizable naming of output files, facilitating better organization and retrieval of saved images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`file_url`**
    - Comfy dtype: `STRING`
    - The URL or path to the saved EXR file. This output provides a direct link to the saved image, enabling easy access and integration into further processing or storage solutions.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaveImageOpenEXR:
    def __init__(self):
        try:
            import OpenEXR
            import Imath
            self.OpenEXR = OpenEXR
            self.Imath = Imath
            self.use_openexr = True
        except ImportError:
            print("No OpenEXR module found, trying OpenCV...")
            self.use_openexr = False
            try:
                os.environ["OPENCV_IO_ENABLE_OPENEXR"] = "1"
                import cv2
                self.cv2 = cv2
            except ImportError:
                raise ImportError("No OpenEXR or OpenCV module found, can't save EXR")
        
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"
        self.prefix_append = ""
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {  
            "images": ("IMAGE", ),
            "filename_prefix": ("STRING", {"default": "ComfyUI_EXR"})
            },
            
            }
    
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES =("file_url",)
    FUNCTION = "saveexr"
    OUTPUT_NODE = True
    CATEGORY = "Marigold"

    def saveexr(self, images, filename_prefix):
        import re
        filename_prefix += self.prefix_append
        full_output_folder, filename, counter, subfolder, filename_prefix = folder_paths.get_save_image_path(filename_prefix, self.output_dir, images[0].shape[1], images[0].shape[0])
        results = list()
        def file_counter():
            max_counter = 0
            # Loop through the existing files
            for existing_file in os.listdir(full_output_folder):
                # Check if the file matches the expected format
                match = re.fullmatch(f"{filename}_(\d+)_?\.[a-zA-Z0-9]+", existing_file)
                if match:
                    # Extract the numeric portion of the filename
                    file_counter = int(match.group(1))
                    # Update the maximum counter value if necessary
                    if file_counter > max_counter:
                        max_counter = file_counter
            return max_counter
        
        for image in images:
            # Ensure the tensor is on the CPU and convert it to a numpy array
            image_np = image.cpu().numpy()
            image_np = image_np.astype(np.float32)

            if self.use_openexr:
                # Assuming the image is in the format of floating point 32 bit (change PIXEL_TYPE if not)
                PIXEL_TYPE = self.Imath.PixelType(self.Imath.PixelType.FLOAT)
                height, width, channels = image_np.shape

                # Prepare the EXR header
                header = self.OpenEXR.Header(width, height)
                half_chan = self.Imath.Channel(PIXEL_TYPE)
                header['channels'] = dict([(c, half_chan) for c in "RGB"])

                # Split the channels for OpenEXR
                R = image_np[:, :, 0].tostring()
                G = image_np[:, :, 1].tostring()
                B = image_np[:, :, 2].tostring()

                # Increment the counter by 1 to get the next available value
                counter = file_counter() + 1
                file = f"{filename}_{counter:05}.exr"

                # Write the EXR file
                exr_file = self.OpenEXR.OutputFile(os.path.join(full_output_folder, file), header)
                exr_file.writePixels({'R': R, 'G': G, 'B': B})
                exr_file.close()
            else:            
                counter = file_counter() + 1
                file = f"{filename}_{counter:05}.exr"
                exr_file = os.path.join(full_output_folder, file)
                self.cv2.imwrite(exr_file, image_np)

        return (f"/view?filename={file}&subfolder=&type=output",)

```
