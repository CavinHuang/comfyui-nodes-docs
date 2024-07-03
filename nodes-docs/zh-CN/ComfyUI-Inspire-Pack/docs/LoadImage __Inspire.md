
# Documentation
- Class name: LoadImage __Inspire
- Category: InspirePack/image
- Output node: False

LoadImage节点是Inspire包中的一个组件，旨在加载和预处理图像，以便在图像处理工作流程中进一步使用。它负责从指定目录加载图像，应用必要的转换（如解码、方向校正和归一化），并可选择性地为具有透明度的图像生成蒙版。

# Input types
## Required
- image
    - 指定要加载的图像文件。这个输入对于确定哪个图像被处理和加载到工作流程中至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- image_data
    - 以base64编码的字符串格式提供图像数据。这些数据被解码和处理以生成图像及其蒙版（如果适用）。它作为图像加载的另一种输入方法。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 处理后的图像，可用于后续的图像处理任务。它以归一化张量的形式返回，反映了应用的预处理步骤。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 可选输出，为图像提供蒙版，对于具有透明度的图像特别有用。它指示了在进一步处理步骤中感兴趣或需要排除的区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LoadImageInspire:
    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
        return {"required": {
                                "image": (sorted(files) + ["#DATA"], {"image_upload": True}),
                                "image_data": ("STRING", {"multiline": False}),
                            }
                }

    CATEGORY = "InspirePack/image"

    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "load_image"

    def load_image(self, image, image_data):
        image_data = base64.b64decode(image_data.split(",")[1])
        i = Image.open(BytesIO(image_data))
        i = ImageOps.exif_transpose(i)
        image = i.convert("RGB")
        image = np.array(image).astype(np.float32) / 255.0
        image = torch.from_numpy(image)[None,]
        if 'A' in i.getbands():
            mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
            mask = 1. - torch.from_numpy(mask)
        else:
            mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")
        return (image, mask.unsqueeze(0))

```
