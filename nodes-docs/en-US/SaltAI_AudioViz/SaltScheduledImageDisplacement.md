---
tags:
- Scheduling
---

# Scheduled Image Displacement
## Documentation
- Class name: `SaltScheduledImageDisplacement`
- Category: `SALT/Scheduling/Image`
- Output node: `False`

This node applies a scheduled displacement to a batch of images based on provided amplitude and angle schedules, utilizing an optimized displacement layer for image transformation. It allows for dynamic image manipulation over a sequence, adapting the displacement effect according to predefined schedules.
## Input types
### Required
- **`images`**
    - The batch of images to be displaced. This input is crucial for defining the base content that will undergo displacement.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`displacement_images`**
    - Images used to determine the displacement direction and magnitude for each image in the batch. These images play a key role in guiding the displacement process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`amplitude_schedule`**
    - A schedule specifying the amplitude of displacement for each image in the batch. It controls the intensity of the displacement effect.
    - Comfy dtype: `LIST`
    - Python dtype: `Optional[List[float]]`
- **`angle_schedule`**
    - A schedule detailing the angle of displacement for each image. This parameter dictates the direction of the displacement effect.
    - Comfy dtype: `LIST`
    - Python dtype: `Optional[List[float]]`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The batch of images after applying the scheduled displacement. This output showcases the transformed images with the displacement effects applied.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduledImageDisplacement:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "displacement_images": ("IMAGE",),
            },
            "optional": {
                "amplitude_schedule": ("LIST",),
                "angle_schedule": ("LIST",),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)

    FUNCTION = "apply_displacement"
    CATEGORY = "SALT/Scheduling/Image"

    def apply_displacement(self, images, displacement_images, amplitude_schedule=None, angle_schedule=None):
        batch_size, height, width, _ = images.shape
        device = images.device

        # Initialize the optimized displacement layer
        displacement_layer = DisplacementLayer(device)

        displaced_images = []
        for i in range(batch_size):
            # Default amplitude and angle to 0 if their schedules are not provided or are too short
            amplitude_value = amplitude_schedule[i] if amplitude_schedule and i < len(amplitude_schedule) else 0
            angle_value = angle_schedule[i] if angle_schedule and i < len(angle_schedule) else 0

            amplitude = torch.tensor([amplitude_value], dtype=torch.float, device=device)
            angle = torch.tensor([angle_value], dtype=torch.float, device=device)
            
            image = images[i:i+1].to(device)
            displacement_image = displacement_images[i:i+1].to(device)
            
            # Use the displacement layer
            displaced_image = displacement_layer(image, displacement_image, amplitude, angle)
            displaced_images.append(displaced_image)

        # Combine the batch of displaced images
        displaced_images = torch.cat(displaced_images, dim=0)

        return (displaced_images,)

```
