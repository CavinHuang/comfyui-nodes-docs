
# Documentation
- Class name: FL_DirectoryCrawl
- Category: 🏵️Fill Nodes
- Output node: False

FL_DirectoryCrawl节点旨在扫描指定目录及其子目录中的图像文件，支持多种常见图像格式。它加载这些图像，应用必要的方向校正，将它们转换为统一的RGB格式，最后将它们聚合成一批张量。这个过程有助于对文件系统中的图像进行批量处理，以便进行进一步的图像操作或分析。

# Input types
## Required
- directory_path
    - 指定节点将扫描图像文件的目录路径。这个路径至关重要，因为它决定了搜索图像文件的起始位置，从而影响哪些图像会被加载和处理。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 一批已加载、正确定向、转换为RGB格式并标准化的图像，封装在张量中。这个输出便于在基于图像的机器学习工作流程中进行进一步的处理或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
