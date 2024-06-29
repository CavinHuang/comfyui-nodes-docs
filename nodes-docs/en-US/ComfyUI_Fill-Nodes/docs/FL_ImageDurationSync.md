---
tags:
- AnimationScheduling
---

# FL Image Duration Sync
## Documentation
- Class name: `FL_ImageDurationSync`
- Category: `🏵️Fill Nodes`
- Output node: `False`

The FL_ImageDurationSync node is designed to synchronize the duration of a sequence of images with a specific musical beat per minute (BPM), frame count, and bars, adjusting the number of frames each image is held to match the desired total duration. This functionality is particularly useful in creating visuals that align with audio tracks, ensuring that the visual elements progress in harmony with the music's tempo.
## Input types
### Required
- **`images`**
    - The sequence of images to be synchronized with the audio duration. This input is crucial for determining the base visual content that will be adjusted in duration.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`frame_count`**
    - Specifies the total number of frames for the output sequence, influencing how the images are stretched or compressed to fit the desired duration.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bpm`**
    - The beats per minute of the audio track, which is used to calculate the duration of each bar and, consequently, the total duration of the image sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fps`**
    - The frames per second rate at which the images will be displayed, affecting the calculation of how long each image is held.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bars`**
    - The number of musical bars over which the images will be synchronized, directly impacting the total duration of the visual sequence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`output_images`**
    - Comfy dtype: `IMAGE`
    - The sequence of images adjusted to match the desired duration, ensuring synchronization with the audio track.
    - Python dtype: `torch.Tensor`
- **`hold_frames`**
    - Comfy dtype: `INT`
    - The number of frames each image is held, calculated based on the BPM, bars, and FPS to achieve the desired synchronization.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FL_ImageDurationSync:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE", {}),
                "frame_count": ("INT", {"default": 30}),
                "bpm": ("INT", {"default": 120}),
                "fps": ("INT", {"default": 30}),
                "bars": ("FLOAT", {"default": 4.0, "step": 0.05}),
            }
        }

    RETURN_TYPES = ("IMAGE", "INT")
    RETURN_NAMES = ("output_images", "hold_frames")
    FUNCTION = "sync_image_to_duration"
    CATEGORY = "🏵️Fill Nodes"

    def sync_image_to_duration(self, images, bpm, frame_count, bars, fps):
        # Calculate the duration of each bar in seconds
        bar_duration = 60 / bpm * 4

        # Calculate the total duration in seconds
        total_duration = bar_duration * bars

        # Calculate the number of frames to hold the image
        hold_frames = int(total_duration * fps)

        # Repeat the image for the calculated number of frames
        output_images = images.repeat(hold_frames, 1, 1, 1)

        return (output_images, hold_frames)

```
