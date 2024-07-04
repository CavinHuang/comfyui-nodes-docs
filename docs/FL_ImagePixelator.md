
# Documentation
- Class name: FL_ImagePixelator
- Category: 🏵️Fill Nodes
- Output node: False
- Repo Ref: https://github.com/fillmeout/image_manipulators/FL_ImagePixelator

FL_ImagePixelator节点能够为图像添加像素化效果，支持单张图像和批量图像处理。它可以处理tensor格式或PIL格式的图像，通过应用缩放因子来实现图像像素化，并使用指定的核大小进行额外处理，从而增强像素化效果。

# Input types
## Required
- image
    - 需要进行像素化处理的图像。可以是单张图像或一批图像，格式可以是torch.Tensor或PIL.Image。这是像素化处理的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: Union[torch.Tensor, PIL.Image.Image]
- scale_factor
    - 决定像素化效果的强度，通过在放大前先将图像分辨率降低来实现。
    - Comfy dtype: FLOAT
    - Python dtype: float
- kernel_size
    - 指定像素化后额外处理步骤中使用的核大小，影响最终像素化图像的外观。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 根据指定的缩放因子和核大小处理后的像素化图像。可以是单张图像或一批图像，格式与输入相同。
    - Comfy dtype: IMAGE
    - Python dtype: Union[torch.Tensor, PIL.Image.Image]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FL_ImagePixelator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE", {}),
                "scale_factor": ("FLOAT", {"default": 0.0500, "min": 0.0100, "max": 0.2000, "step": 0.0100}),
                "kernel_size": ("INT", {"default": 3, "max": 10, "step": 1}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "pixelate_image"
    CATEGORY = "🏵️Fill Nodes"

    def pixelate_image(self, image, scale_factor, kernel_size):
        if isinstance(image, torch.Tensor):
            if image.dim() == 4:  # Batch dimension is present
                output_images = []
                total_frames = image.shape[0]
                for i, single_image in enumerate(image, start=1):
                    single_image = single_image.unsqueeze(0)  # Add batch dimension
                    single_image = self.apply_pixelation_tensor(single_image, scale_factor)
                    single_image = self.process(single_image, kernel_size)
                    output_images.append(single_image)
                    print(f"Processing frame {i}/{total_frames}")
                image = torch.cat(output_images, dim=0)  # Concatenate processed images along batch dimension
            elif image.dim() == 3:  # No batch dimension, single image
                image = image.unsqueeze(0)  # Add batch dimension
                image = self.apply_pixelation_tensor(image, scale_factor)
                image = self.process(image, kernel_size)
                image = image.squeeze(0)  # Remove batch dimension
                print("Processing single image")
            else:
                return (None,)
        elif isinstance(image, Image.Image):
            image = self.apply_pixelation_pil(image, scale_factor)
            image = self.process(image, kernel_size)
            print("Processing single PIL image")
        else:
            return (None,)

        return (image,)

    def apply_pixelation_pil(self, input_image, scale_factor):
        width, height = input_image.size
        new_size = (int(width * scale_factor), int(height * scale_factor))
        resized_image = input_image.resize(new_size, Image.NEAREST)
        pixelated_image = resized_image.resize((width, height), Image.NEAREST)
        return pixelated_image

    def apply_pixelation_tensor(self, input_image, scale_factor):
        _, num_channels, height, width = input_image.shape
        new_height, new_width = max(1, int(height * scale_factor)), max(1, int(width * scale_factor))
        resized_tensor = torch.nn.functional.interpolate(input_image, size=(new_height, new_width), mode='nearest')
        output_tensor = torch.nn.functional.interpolate(resized_tensor, size=(height, width), mode='nearest')
        return output_tensor

    def process(self, image, kernel_size):
        device = comfy.model_management.get_torch_device()
        kernel = torch.ones(kernel_size, kernel_size, device=device)
        image_k = image.to(device).movedim(-1, 1)
        output = gradient(image_k, kernel)
        img_out = output.to(comfy.model_management.intermediate_device()).movedim(1, -1)
        return img_out

```
