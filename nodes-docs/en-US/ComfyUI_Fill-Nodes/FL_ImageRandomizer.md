---
tags:
- Image
- Multimedia
---

# FL Image Randomizer
## Documentation
- Class name: `FL_ImageRandomizer`
- Category: `🏵️Fill Nodes`
- Output node: `False`

The FL_ImageRandomizer node is designed to select and process images from a specified directory, offering options for random selection or sequential access. It enhances image handling in workflows by providing a flexible way to work with image datasets, including randomization features for varied outputs.
## Input types
### Required
- **`directory_path`**
    - Specifies the filesystem path to the directory containing images. It is essential for locating and loading the images to be processed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`randomize`**
    - A boolean toggle that determines whether images are selected randomly or sequentially. This affects the diversity and unpredictability of the output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`run_trigger`**
    - A dummy input used to trigger the node's execution, helping to circumvent caching issues.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image, returned as a tensor, suitable for further image processing or visualization tasks.
    - Python dtype: `torch.Tensor`
- **`path`**
    - Comfy dtype: `PATH`
    - The filesystem path of the selected image, providing context or for use in subsequent operations.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FL_ImageRandomizer:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "directory_path": ("STRING", {"default": ""}),
                "randomize": ("BOOLEAN", {"default": True}),  # Toggle for randomization
                "run_trigger": ("INT", {"default": 0}),  # Dummy input for caching issue
            }
        }

    RETURN_TYPES = ("IMAGE", "PATH")  # Adjusted to include image path for preview
    FUNCTION = "select_image"
    CATEGORY = "🏵️Fill Nodes"  # Adjusted to appear under "Fill Nodes"

    def __init__(self):
        self.last_index = -1

    def select_image(self, directory_path, randomize, run_trigger):
        if not directory_path:
            raise ValueError("Directory path is not provided.")

        images = self.load_images(directory_path)
        if not images:
            raise ValueError("No images found in the specified directory.")

        if randomize:
            selected_image_path = random.choice(images)
        else:
            self.last_index = (self.last_index + 1) % len(images)
            selected_image_path = images[self.last_index]

        image = Image.open(selected_image_path)
        image = ImageOps.exif_transpose(image)
        image = image.convert("RGB")
        image_np = np.array(image).astype(np.float32) / 255.0
        image_tensor = torch.from_numpy(image_np)[None,]

        return (image_tensor, selected_image_path)  # Return both data points

    def load_images(self, directory):
        supported_formats = ["jpg", "jpeg", "png", "bmp", "gif"]
        return [os.path.join(directory, f) for f in os.listdir(directory)
                if os.path.isfile(os.path.join(directory, f)) and f.split('.')[-1].lower() in supported_formats]

```
