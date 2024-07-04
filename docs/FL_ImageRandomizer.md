
# Documentation
- Class name: FL_ImageRandomizer
- Category: 🏵️Fill Nodes
- Output node: False

FL_ImageRandomizer节点旨在从指定目录中选择和处理图像，提供随机选择或顺序访问的选项。它通过提供灵活的方式来处理图像数据集，包括随机化功能以产生多样化的输出，从而增强工作流程中的图像处理能力。

# Input types
## Required
- directory_path
    - 指定包含图像的目录的文件系统路径。这对于定位和加载要处理的图像至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- randomize
    - 一个布尔开关，用于决定是随机选择图像还是按顺序选择。这会影响输出的多样性和不可预测性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- run_trigger
    - 一个用于触发节点执行的虚拟输入，有助于绕过缓存问题。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 处理后的图像，以张量形式返回，适用于进一步的图像处理或可视化任务。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- path
    - 所选图像的文件系统路径，提供上下文信息或用于后续操作。
    - Comfy dtype: PATH
    - Python dtype: str


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
