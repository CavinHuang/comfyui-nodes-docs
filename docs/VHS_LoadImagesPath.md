# Load Images (Path) 🎥🅥🅗🅢
## Documentation
- Class name: VHS_LoadImagesPath
- Category: Video Helper Suite 🎥🅥🅗🅢
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

VHS_LoadImagesPath节点用于将图像从指定目录路径加载到视频编辑或处理工作流程中。它支持过滤和选择选项，以自定义加载的图像集，从而在视频助手套件中高效管理和处理图像批次。

## Input types
### Required
- directory
    - 指定要从中加载图像的目录。此参数对于确定要处理的图像来源至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

### Optional
- image_load_cap
    - 限制从目录加载的图像数量，允许控制处理批次的大小。
    - Comfy dtype: INT
    - Python dtype: int
- skip_first_images
    - 跳过目录开头指定数量的图像，允许根据顺序选择性加载图像。
    - Comfy dtype: INT
    - Python dtype: int
- select_every_nth
    - 加载目录中的每第n张图像，提供了一种稀释要处理的图像集的方法。
    - Comfy dtype: INT
    - Python dtype: int

## Output types
- image
    - Comfy dtype: IMAGE
    - 加载的图像，准备在工作流程中进一步处理或操作。
    - Python dtype: torch.Tensor
- mask
    - Comfy dtype: MASK
    - 为加载的图像生成的蒙版，对于需要分割或选择性编辑的图像编辑任务很有用。
    - Python dtype: torch.Tensor
- int
    - Comfy dtype: INT
    - 加载的图像总数，在应用加载参数后提供批次大小的见解。
    - Python dtype: int

## Usage tips
- Infra type: CPU
- Common nodes:
    - [ImpactImageBatchToImageList](../../ComfyUI-Impact-Pack/Nodes/ImpactImageBatchToImageList.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [IPAdapterEncoder](../../ComfyUI_IPAdapter_plus/Nodes/IPAdapterEncoder.md)
    - LinearBatchCreativeInterpolation

## Source code
```python
class LoadImagesFromDirectoryPath:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "directory": ("STRING", {"default": "X://path/to/images", "vhs_path_extensions": []}),
            },
            "optional": {
                "image_load_cap": ("INT", {"default": 0, "min": 0, "max": BIGMAX, "step": 1}),
                "skip_first_images": ("INT", {"default": 0, "min": 0, "max": BIGMAX, "step": 1}),
                "select_every_nth": ("INT", {"default": 1, "min": 1, "max": BIGMAX, "step": 1}),
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK", "INT")
    FUNCTION = "load_images"

    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢"

    def load_images(self, directory: str, **kwargs):
        if directory is None or validate_load_images(directory) != True:
            raise Exception("directory is not valid: " + directory)

        return load_images(directory, **kwargs)

    @classmethod
    def IS_CHANGED(s, directory: str, **kwargs):
        if directory is None:
            return "input"
        return is_changed_load_images(directory, **kwargs)

    @classmethod
    def VALIDATE_INPUTS(s, directory: str, **kwargs):
        if directory is None:
            return True
        return validate_load_images(directory)