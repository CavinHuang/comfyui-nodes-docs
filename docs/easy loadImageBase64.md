
# Documentation
- Class name: easy loadImageBase64
- Category: EasyUse/Image/LoadImage
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

easy loadImageBase64节点用于加载Base64编码格式的图像，并将其转换为适合在ComfyUI框架内进行进一步图像处理或操作的格式。它充当了编码图像数据与图像处理流程中使用的内部图像表示之间的桥梁，有助于集成外部来源的图像。

# Input types
## Required
- base64_data
    - base64_data参数是图像数据的Base64编码字符串。它对于将图像解码回可用于节点内处理和操作的格式至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- image_output
    - image_output参数指定如何处理加载的图像，例如显示、隐藏或保存图像。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- save_prefix
    - save_prefix参数决定了保存处理后图像时的文件名前缀。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 输出的image是张量格式的处理后图像，可以在ComfyUI框架内进行进一步操作或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 输出的mask提供了一个可选的遮罩张量，如果图像包含透明度信息，这对于后续的图像处理步骤很有用。
    - Comfy dtype: MASK
    - Python dtype: Optional[torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class loadImageBase64:
  @classmethod
  def INPUT_TYPES(s):
    return {
      "required": {
        "base64_data": ("STRING", {"default": ""}),
        "image_output": (["Hide", "Preview", "Save", "Hide/Save"], {"default": "Preview"}),
        "save_prefix": ("STRING", {"default": "ComfyUI"}),
      },
      "optional": {

      },
      "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
    }

  RETURN_TYPES = ("IMAGE", "MASK")
  OUTPUT_NODE = True
  FUNCTION = "load_image"
  CATEGORY = "EasyUse/Image/LoadImage"

  def convert_color(self, image,):
    if len(image.shape) > 2 and image.shape[2] >= 4:
      return cv2.cvtColor(image, cv2.COLOR_BGRA2RGB)
    return cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

  def load_image(self, base64_data, image_output, save_prefix, prompt=None, extra_pnginfo=None):
    nparr = np.frombuffer(base64.b64decode(base64_data), np.uint8)

    result = cv2.imdecode(nparr, cv2.IMREAD_UNCHANGED)
    channels = cv2.split(result)
    if len(channels) > 3:
      mask = channels[3].astype(np.float32) / 255.0
      mask = torch.from_numpy(mask)
    else:
      mask = torch.ones(channels[0].shape, dtype=torch.float32, device="cpu")

    result = self.convert_color(result)
    result = result.astype(np.float32) / 255.0
    new_images = torch.from_numpy(result)[None,]

    results = easySave(new_images, save_prefix, image_output, None, None)
    mask = mask.unsqueeze(0)

    if image_output in ("Hide", "Hide/Save"):
      return {"ui": {},
              "result": (new_images, mask)}

    return {"ui": {"images": results},
            "result": (new_images, mask)}

```
