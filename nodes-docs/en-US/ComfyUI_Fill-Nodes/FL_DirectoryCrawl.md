---
tags:
- Image
- Multimedia
---

# FL DirectoryCrawl
## Documentation
- Class name: `FL_DirectoryCrawl`
- Category: `🏵️Fill Nodes`
- Output node: `False`

The FL_DirectoryCrawl node is designed to scan a specified directory and its subdirectories for image files, supporting a range of common image formats. It then loads these images, applies necessary orientation corrections, converts them to a uniform RGB format, and finally aggregates them into a batch of tensors. This process facilitates the bulk processing of images located within a filesystem for further image-based operations or analyses.
## Input types
### Required
- **`directory_path`**
    - Specifies the path to the directory that the node will scan for image files. This path is crucial as it determines the root location from which the search for image files will begin, affecting which images are loaded and processed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - A batch of images that have been loaded, oriented correctly, converted to RGB, and normalized, encapsulated within a tensor. This output facilitates further processing or analysis in image-based machine learning workflows.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FL_DirectoryCrawl:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "directory_path": ("STRING", {"default": ""}),
            }
        }

    RETURN_TYPES = ("IMAGE",)  # Output a batch of images
    FUNCTION = "load_image_batch"
    CATEGORY = "🏵️Fill Nodes"

    def load_image_batch(self, directory_path):
        if not directory_path:
            raise ValueError("Directory path is not provided.")

        image_paths = self.crawl_directories(directory_path)
        if not image_paths:
            raise ValueError("No images found in the specified directory and its subdirectories.")

        batch_images = []
        for img_path in image_paths:
            image = Image.open(img_path)
            image = ImageOps.exif_transpose(image)  # Correct orientation
            image = image.convert("RGB")
            image_np = np.array(image).astype(np.float32) / 255.0
            batch_images.append(image_np)

        batch_images_np = np.stack(batch_images, axis=0)  # Create a numpy array batch
        batch_images_tensor = torch.from_numpy(batch_images_np)  # Convert to tensor

        return (batch_images_tensor,)

    def crawl_directories(self, directory):
        supported_formats = ["jpg", "jpeg", "png", "bmp", "gif"]
        image_paths = []
        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.split('.')[-1].lower() in supported_formats:
                    full_path = os.path.join(root, file)
                    image_paths.append(full_path)
        return image_paths

```
