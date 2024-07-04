
# Documentation
- Class name: easy imageToBase64
- Category: EasyUse/Image
- Output node: True

easy imageToBase64节点旨在将图像从张量格式转换为Base64编码的字符串。这一功能对于需要通过互联网以文本格式传输图像的Web应用程序和API来说至关重要。

# Input types
## Required
- image
    - image参数是表示待转换图像的输入张量。它在转换过程中扮演着关键角色，因为它是将被转换成Base64编码字符串的源图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- string
    - 输出是输入图像的Base64编码字符串表示。这种格式广泛用于在HTML或CSS文件中嵌入图像，或在不支持二进制数据传输的网络中传输图像。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class imageToBase64:
    @classmethod
    def INPUT_TYPES(s):
        return {
        "required": {
            "image": ("IMAGE",),
        },
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "to_base64"
    CATEGORY = "EasyUse/Image"
    OUTPUT_NODE = True

    def to_base64(self, image, ):
      import base64
      from io import BytesIO

      # 将张量图像转换为PIL图像
      pil_image = tensor2pil(image)

      buffered = BytesIO()
      pil_image.save(buffered, format="JPEG")
      image_bytes = buffered.getvalue()

      base64_str = base64.b64encode(image_bytes).decode("utf-8")
      return {"result": (base64_str,)}

```
