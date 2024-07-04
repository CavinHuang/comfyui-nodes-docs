
# Documentation
- Class name: ImageTransformByNormalizedAmplitude
- Category: KJNodes/audio
- Output node: False

ImageTransformByNormalizedAmplitude 节点根据归一化的振幅值对图像应用变换，动态调整诸如缩放比例等方面。它设计用于根据音频驱动的振幅数据调整批量图像的大小，从而实现创意性的视听同步效果。

# Input types
## Required
- normalized_amp
    - 归一化振幅值数组，每个值对应批次中的一张图像，用于确定变换的比例。
    - Comfy dtype: NORMALIZED_AMPLITUDE
    - Python dtype: numpy.ndarray
- zoom_scale
    - 缩放因子，决定了基于振幅值图像缩放的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- x_offset
    - 缩放后应用于图像的水平偏移量，允许进行位置调整。
    - Comfy dtype: INT
    - Python dtype: int
- y_offset
    - 缩放后应用于图像的垂直偏移量，允许进行位置调整。
    - Comfy dtype: INT
    - Python dtype: int
- cumulative
    - 布尔值，指示缩放效果是否应在批次中的图像间累积。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- image
    - 待变换的图像批次，每张图像的变换受其对应振幅值的影响。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 变换后的图像，每张图像都根据其对应的归一化振幅值、缩放比例和位置偏移进行了调整。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformByNormalizedAmplitude:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "normalized_amp": ("NORMALIZED_AMPLITUDE",),
            "zoom_scale": ("FLOAT", { "default": 0.0, "min": -1.0, "max": 1.0, "step": 0.001, "display": "number" }),
            "x_offset": ("INT", { "default": 0, "min": (1 -MAX_RESOLUTION), "max": MAX_RESOLUTION, "step": 1, "display": "number" }),
            "y_offset": ("INT", { "default": 0, "min": (1 -MAX_RESOLUTION), "max": MAX_RESOLUTION, "step": 1, "display": "number" }),
            "cumulative": ("BOOLEAN", { "default": False }),
            "image": ("IMAGE",),
        }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "amptransform"
    CATEGORY = "KJNodes/audio"
    DESCRIPTION = """
Works as a bridge to the AudioScheduler -nodes:  
https://github.com/a1lazydog/ComfyUI-AudioScheduler  
Transforms image based on the normalized amplitude.
"""

    def amptransform(self, image, normalized_amp, zoom_scale, cumulative, x_offset, y_offset):
        # Ensure normalized_amp is an array and within the range [0, 1]
        normalized_amp = np.clip(normalized_amp, 0.0, 1.0)
        transformed_images = []

        # Initialize the cumulative zoom factor
        prev_amp = 0.0

        for i in range(image.shape[0]):
            img = image[i]  # Get the i-th image in the batch
            amp = normalized_amp[i]  # Get the corresponding amplitude value

            # Incrementally increase the cumulative zoom factor
            if cumulative:
                prev_amp += amp
                amp += prev_amp

            # Convert the image tensor from BxHxWxC to CxHxW format expected by torchvision
            img = img.permute(2, 0, 1)
            
            # Convert PyTorch tensor to PIL Image for processing
            pil_img = TF.to_pil_image(img)
            
            # Calculate the crop size based on the amplitude
            width, height = pil_img.size
            crop_size = int(min(width, height) * (1 - amp * zoom_scale))
            crop_size = max(crop_size, 1)
            
            # Calculate the crop box coordinates (centered crop)
            left = (width - crop_size) // 2
            top = (height - crop_size) // 2
            right = (width + crop_size) // 2
            bottom = (height + crop_size) // 2
            
            # Crop and resize back to original size
            cropped_img = TF.crop(pil_img, top, left, crop_size, crop_size)
            resized_img = TF.resize(cropped_img, (height, width))
            
            # Convert back to tensor in CxHxW format
            tensor_img = TF.to_tensor(resized_img)
            
            # Convert the tensor back to BxHxWxC format
            tensor_img = tensor_img.permute(1, 2, 0)
            
            # Offset the image based on the amplitude
            offset_amp = amp * 10  # Calculate the offset magnitude based on the amplitude
            shift_x = min(x_offset * offset_amp, img.shape[1] - 1)  # Calculate the shift in x direction
            shift_y = min(y_offset * offset_amp, img.shape[0] - 1)  # Calculate the shift in y direction

            # Apply the offset to the image tensor
            if shift_x != 0:
                tensor_img = torch.roll(tensor_img, shifts=int(shift_x), dims=1)
            if shift_y != 0:
                tensor_img = torch.roll(tensor_img, shifts=int(shift_y), dims=0)

            # Add to the list
            transformed_images.append(tensor_img)
        
        # Stack all transformed images into a batch
        transformed_batch = torch.stack(transformed_images)
        
        return (transformed_batch,)

```
