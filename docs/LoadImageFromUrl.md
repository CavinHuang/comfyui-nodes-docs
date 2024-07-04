
# Documentation
- Class name: LoadImageFromUrl
- Category: Art Venture/Image
- Output node: False

这个节点专门用于从URL获取和处理图像，支持处理各种图像格式，并提供保留透明度信息的选项。

# Input types
## Required
- url
    - 指定要加载图像的URL，支持多种来源。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- keep_alpha_channel
    - 指示是否应保留图像的透明度通道，对于透明度至关重要的图像很有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- output_mode
    - 控制图像的输出格式，提供列表和批处理模式之间的选项，以灵活处理加载的图像。
    - Comfy dtype: BOOLEAN
    - Python dtype: str

# Output types
- images
    - 加载的图像，如果指定，可能包括透明度信息。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- masks
    - 从图像生成的蒙版，用于进一步的图像处理任务。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- has_image
    - 表示是否成功加载图像的布尔指示符。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilLoadImageFromUrl:
    def __init__(self) -> None:
        self.output_dir = folder_paths.get_temp_directory()
        self.filename_prefix = "TempImageFromUrl"

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "url": ("STRING", {"default": "", "multiline": True, "dynamicPrompts": False}),
            },
            "optional": {
                "keep_alpha_channel": (
                    "BOOLEAN",
                    {"default": False, "label_on": "enabled", "label_off": "disabled"},
                ),
                "output_mode": (
                    "BOOLEAN",
                    {"default": False, "label_on": "list", "label_off": "batch"},
                ),
            },
        }

    RETURN_TYPES = ("IMAGE", "MASK", "BOOLEAN")
    OUTPUT_IS_LIST = (True, True, False)
    RETURN_NAMES = ("images", "masks", "has_image")
    CATEGORY = "Art Venture/Image"
    FUNCTION = "load_image"

    def load_image(self, url: str, keep_alpha_channel=False, output_mode=False):
        urls = url.strip().split("\n")
        images, masks = load_images_from_url(urls, keep_alpha_channel)
        if len(images) == 0:
            image = torch.zeros((1, 64, 64, 3), dtype=torch.float32, device="cpu")
            mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")
            return ([image], [mask], False)

        previews = []
        np_images = []
        np_masks = []

        for image, mask in zip(images, masks):
            # save image to temp folder
            preview = prepare_image_for_preview(image, self.output_dir, self.filename_prefix)
            image = pil2tensor(image)

            if mask:
                mask = np.array(mask).astype(np.float32) / 255.0
                mask = 1.0 - torch.from_numpy(mask)
            else:
                mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")

            previews.append(preview)
            np_images.append(image)
            np_masks.append(mask.unsqueeze(0))

        if output_mode:
            result = (np_images, np_masks, True)
        else:
            has_size_mismatch = False
            if len(np_images) > 1:
                for image in np_images[1:]:
                    if image.shape[1] != np_images[0].shape[1] or image.shape[2] != np_images[0].shape[2]:
                        has_size_mismatch = True
                        break

            if has_size_mismatch:
                raise Exception("To output as batch, images must have the same size. Use list output mode instead.")

            result = ([torch.cat(np_images)], [torch.cat(np_masks)], True)

        return {"ui": {"images": previews}, "result": result}

```
