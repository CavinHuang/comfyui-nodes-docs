
# Documentation
- Class name: FL_ImageDurationSync
- Category: 🏵️Fill Nodes
- Output node: False

FL_ImageDurationSync节点旨在将一系列图像的持续时间与特定的音乐节拍每分钟(BPM)、帧数和小节数同步，调整每张图像的保持帧数以匹配所需的总持续时间。这一功能在创建与音轨对齐的视觉效果时特别有用，确保视觉元素与音乐节奏和谐地前进。

# Input types
## Required
- images
    - 需要与音频持续时间同步的图像序列。这个输入对于确定将在持续时间上进行调整的基本视觉内容至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- frame_count
    - 指定输出序列的总帧数，影响图像如何被拉伸或压缩以适应所需的持续时间。
    - Comfy dtype: INT
    - Python dtype: int
- bpm
    - 音轨的每分钟拍数，用于计算每小节的持续时间，进而计算图像序列的总持续时间。
    - Comfy dtype: INT
    - Python dtype: int
- fps
    - 图像将被显示的每秒帧数，影响每张图像保持时间的计算。
    - Comfy dtype: INT
    - Python dtype: int
- bars
    - 图像将同步的音乐小节数，直接影响视觉序列的总持续时间。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output_images
    - 调整后的图像序列，以匹配所需的持续时间，确保与音轨同步。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- hold_frames
    - 每张图像保持的帧数，根据BPM、小节数和FPS计算得出，以实现所需的同步。
    - Comfy dtype: INT
    - Python dtype: int


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
