---
tags:
- ImageMask
- ImageMaskConversion
- Mask
- MaskGeneration
---

# ImageToMask
## Documentation
- Class name: `easy imageToMask`
- Category: `EasyUse/Image`
- Output node: `False`

This node is designed to convert images into masks based on specific criteria or attributes. It encapsulates the functionality to process an image and extract a mask representation, which can be used for various applications such as image editing, compositing, or further image analysis.
## Input types
### Required
- **`image`**
    - The input image from which the mask will be generated. The image is processed to identify and isolate specific features or colors that define the mask.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`channel`**
    - Specifies the color channel ('red', 'green', 'blue', 'alpha') used to generate the mask. This parameter determines which part of the image is used to create the mask, based on the selected color channel.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output mask generated from the input image. This mask isolates specific features or colors from the original image, providing a binary or grayscale representation for further processing.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [MaskComposite](../../Comfy/Nodes/MaskComposite.md)
    - [GrowMask](../../Comfy/Nodes/GrowMask.md)
    - IPAdapterApplyFaceID



## Source code
```python
class imageToMask:
  @classmethod
  def INPUT_TYPES(s):
    return {"required": {
        "image": ("IMAGE",),
        "channel": (['red', 'green', 'blue'],),
       }
    }

  RETURN_TYPES = ("MASK",)
  FUNCTION = "convert"
  CATEGORY = "EasyUse/Image"

  def convert_to_single_channel(self, image, channel='red'):
    # Convert to RGB mode to access individual channels
    image = image.convert('RGB')

    # Extract the desired channel and convert to greyscale
    if channel == 'red':
      channel_img = image.split()[0].convert('L')
    elif channel == 'green':
      channel_img = image.split()[1].convert('L')
    elif channel == 'blue':
      channel_img = image.split()[2].convert('L')
    else:
      raise ValueError(
        "Invalid channel option. Please choose 'red', 'green', or 'blue'.")

    # Convert the greyscale channel back to RGB mode
    channel_img = Image.merge(
      'RGB', (channel_img, channel_img, channel_img))

    return channel_img

  def convert(self, image, channel='red'):
    image = self.convert_to_single_channel(tensor2pil(image), channel)
    image = pil2tensor(image)
    return (image.squeeze().mean(2),)

```
