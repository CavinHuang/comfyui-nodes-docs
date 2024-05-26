# Documentation
- Class name: CR_LoadAnimationFrames
- Category: Comfyroll/Animation/IO
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_LoadAnimationFrames 是一个用于从指定目录加载和处理图像序列的节点，它允许在工作流中操纵和分析帧数据。它促进了图像文件的转换，使其适合进一步处理，例如动画或视频编辑任务。

# Input types
## Required
- image_sequence_folder
    - image_sequence_folder 参数指定包含要加载的图像序列的目录。对于节点来说，定位和访问正确的图像序列以进行处理至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- start_index
    - start_index 参数确定要加载的图像序列的起始点。它对于控制序列的开始帧很重要，允许选择性地加载序列中的帧。
    - Comfy dtype: INT
    - Python dtype: int
- max_frames
    - max_frames 参数设置了从图像序列中加载的最大帧数。它在限制处理的数据量方面发挥着重要作用，这对于优化资源使用和工作流效率至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - IMAGE 输出提供了作为帧堆栈的加载图像序列，允许在工作流中进行下游处理和分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help 输出提供了一个链接到文档，以获取有关使用节点和理解其功能的进一步指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_LoadAnimationFrames:
    input_dir = folder_paths.input_directory

    @classmethod
    def INPUT_TYPES(s):
        image_folder = [name for name in os.listdir(s.input_dir) if os.path.isdir(os.path.join(s.input_dir, name)) and len(os.listdir(os.path.join(s.input_dir, name))) != 0]
        return {'required': {'image_sequence_folder': (sorted(image_folder),), 'start_index': ('INT', {'default': 1, 'min': 1, 'max': 10000}), 'max_frames': ('INT', {'default': 1, 'min': 1, 'max': 10000})}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('IMAGE', 'show_help')
    FUNCTION = 'load_image_sequence'
    CATEGORY = icons.get('Comfyroll/Animation/IO')

    def load_image_sequence(self, image_sequence_folder, start_index, max_frames):
        image_path = os.path.join(self.input_dir, image_sequence_folder)
        file_list = sorted(os.listdir(image_path), key=lambda s: sum(((s, int(n)) for (s, n) in re.findall('(\\D+)(\\d+)', 'a%s0' % s)), ()))
        sample_frames = []
        sample_frames_mask = []
        sample_index = list(range(start_index - 1, len(file_list), 1))[:max_frames]
        for num in sample_index:
            i = Image.open(os.path.join(image_path, file_list[num]))
            image = i.convert('RGB')
            image = np.array(image).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]
            image = image.squeeze()
            sample_frames.append(image)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/IO-Nodes#cr-load-animation-frames'
        return (torch.stack(sample_frames), show_help)
```