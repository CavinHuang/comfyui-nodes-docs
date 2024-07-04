
# Documentation
- Class name: SaltCropImageLocation
- Category: SALT/Image/Process
- Output node: False

本节点旨在根据指定位置裁剪图像，实现对图像数据集的精确调整和修改。它专注于增强或隔离图像中的特定区域，以便进行进一步处理或分析。

# Input types
## Required
- images
    - 要裁剪的图像集合。该参数是节点操作的核心，它决定了将根据提供的尺寸进行裁剪的具体图像。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]
- top
    - 指定裁剪区域的上边界。调整此值可以改变裁剪的垂直起点，从而对裁剪区域进行精细控制。
    - Comfy dtype: INT
    - Python dtype: int
- left
    - 定义裁剪区域的左边界。该参数允许精确控制裁剪的水平位置，影响保留的图像区域。
    - Comfy dtype: INT
    - Python dtype: int
- right
    - 设置裁剪区域的右边界，决定裁剪区域的水平范围。这个值影响最终裁剪图像的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- bottom
    - 指示裁剪区域的下边界。该参数影响裁剪的垂直范围，控制裁剪图像的高度。
    - Comfy dtype: INT
    - Python dtype: int

## Optional
- crop_data_batch
    - 可选的裁剪数据批次，用于为一组图像指定多个裁剪区域。该参数支持对具有不同裁剪规格的图像进行批处理。
    - Comfy dtype: CROP_DATA_BATCH
    - Python dtype: Optional[List[Tuple[int, int, int, int]]]

# Output types
- images
    - 裁剪操作后的结果图像。这个输出对于裁剪区域的进一步处理或分析至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]
- crop_data_batch
    - 对应于处理后图像的裁剪数据批次。这个输出提供了应用于每张图像的裁剪区域的详细信息，便于进行进一步的操作或分析。
    - Comfy dtype: CROP_DATA_BATCH
    - Python dtype: List[Tuple[int, int, int, int]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltCropImageLocation:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "top": ("INT", {"default":0, "max": 10000000, "min":0, "step":1}),
                "left": ("INT", {"default":0, "max": 10000000, "min":0, "step":1}),
                "right": ("INT", {"default":256, "max": 10000000, "min":0, "step":1}),
                "bottom": ("INT", {"default":256, "max": 10000000, "min":0, "step":1}),
            },
            "optional": {
                "crop_data_batch": ("CROP_DATA_BATCH",)
            }
        }
    
    RETURN_TYPES = ("IMAGE", "CROP_DATA_BATCH")
    RETURN_NAMES = ("images", "crop_data_batch")

    FUNCTION = "crop"
    CATEGORY = f"{NAME}/Image/Process"

    def crop(self, images, top=0, left=0, right=256, bottom=256, crop_data_batch=None):
        cropped_images = []
        crop_data_list = []
        master_size = None
        
        for i, image in enumerate(images):
            image = tensor2pil(image)
            img_width, img_height = image.size

            if crop_data_batch is not None:
                if len(crop_data_batch) >= i:
                    crop_size, (crop_left, crop_top, crop_right, crop_bottom) = crop_data_batch[i]
                else:
                    cropped_images.append(pil2tensor(image))
                    crop_data_list.append((image.size, (0, 0, image.size[0], image.size[1])))
                    continue
            else:
                crop_top = max(top, 0)
                crop_left = max(left, 0)
                crop_bottom = min(bottom, img_height)
                crop_right = min(right, img_width)

            crop_width = crop_right - crop_left
            crop_height = crop_bottom - crop_top

            if crop_width <= 0 or crop_height <= 0:
                raise ValueError("Invalid crop dimensions.")
            
            crop = image.crop((crop_left, crop_top, crop_right, crop_bottom))
            crop_data = (crop.size, (crop_left, crop_top, crop_right, crop_bottom))
            if not master_size:
                master_size = (((crop.size[0] // 8) * 8), ((crop.size[1] // 8) * 8))
            crop = crop.resize(master_size)
            
            cropped_images.append(pil2tensor(crop))
            crop_data_list.append(crop_data)
        
        cropped_images_batch = torch.cat(cropped_images, dim=0)
        return (cropped_images_batch, crop_data_list)

```
