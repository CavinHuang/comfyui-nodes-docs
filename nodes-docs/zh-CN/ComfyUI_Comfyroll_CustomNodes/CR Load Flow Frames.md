# Documentation
- Class name: CR_LoadFlowFrames
- Category: Comfyroll/Animation/IO
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_LoadFlowFrames 节点旨在为动画目的加载和处理图像序列。它能够根据用户定义的标准对目录中的帧进行排序和选择，确保动画帧逐帧操作的流畅工作流程。

# Input types
## Required
- input_folder
    - input_folder 参数指定包含图像序列的目录。它在确定动画图像的来源中起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- sort_by
    - sort_by 参数确定输入文件夹中图像文件的排序方法。它对于维护动画序列中帧的正确顺序至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- current_frame
    - current_frame 参数指示图像加载过程的起始帧。它对于控制节点在动画序列中开始操作的位置至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- skip_start_frames
    - skip_start_frames 参数允许用户在序列开头跳过一定数量的帧。这对于排除动画不需要的初始帧非常有用。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- input_path
    - 可选的 input_path 参数提供了一个特定的路径到图像文件，如果它们不在默认的输入目录中。它为动画过程提供了文件位置的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- file_pattern
    - file_pattern 参数用于定义输入文件夹内文件选择的模式。它有助于筛选动画所需的特定类型的图像文件。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- current_image
    - current_image 输出提供了从图像序列中加载的最新帧。它对于持续的动画操作和显示非常重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- previous_image
    - previous_image 输出提供了序列中当前帧之前的帧。它可以用于动画中的比较或过渡效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- current_frame
    - current_frame 输出指示当前正在处理的帧编号。这些信息对于跟踪动画序列中的进度非常有用。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - show_help 输出提供了一个链接到文档的链接，以获取有关如何使用该节点的进一步指导。这对于寻求有关节点功能更多信息的用户特别有帮助。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_LoadFlowFrames:

    @classmethod
    def INPUT_TYPES(s):
        sort_methods = ['Index', 'Alphabetic']
        input_dir = folder_paths.input_directory
        input_folders = [name for name in os.listdir(input_dir) if os.path.isdir(os.path.join(input_dir, name)) and len(os.listdir(os.path.join(input_dir, name))) != 0]
        return {'required': {'input_folder': (sorted(input_folders),), 'sort_by': (sort_methods,), 'current_frame': ('INT', {'default': 0, 'min': 0, 'max': 10000, 'forceInput': True}), 'skip_start_frames': ('INT', {'default': 0, 'min': 0, 'max': 10000})}, 'optional': {'input_path': ('STRING', {'default': '', 'multiline': False}), 'file_pattern': ('STRING', {'default': '*.png', 'multiline': False})}}
    CATEGORY = icons.get('Comfyroll/Animation/IO')
    RETURN_TYPES = ('IMAGE', 'IMAGE', 'INT', 'STRING')
    RETURN_NAMES = ('current_image', 'previous_image', 'current_frame', 'show_help')
    FUNCTION = 'load_images'

    def load_images(self, file_pattern, skip_start_frames, input_folder, sort_by, current_frame, input_path=''):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/IO-Nodes#cr-load-flow-frames'
        input_dir = folder_paths.input_directory
        current_frame = current_frame + skip_start_frames
        print(f'[Info] CR Load Flow Frames: current_frame {current_frame}')
        if input_path != '':
            if not os.path.exists(input_path):
                print(f'[Warning] CR Load Flow Frames: The input_path `{input_path}` does not exist')
                return ('',)
            image_path = os.path.join('', input_path)
        else:
            image_path = os.path.join(input_dir, input_folder)
        print(f'[Info] CR Load Flow Frames: ComfyUI Input directory is `{image_path}`')
        file_list = get_files(image_path, sort_by, file_pattern)
        if os.path.exists(image_path + '.DS_Store'):
            file_list.remove('.DS_Store')
        if len(file_list) == 0:
            print(f'[Warning] CR Load Flow Frames: No matching files found for loading')
            return ()
        remaining_files = len(file_list) - current_frame
        print(f'[Info] CR Load Flow Frames: {remaining_files} input files remaining for processing')
        img = Image.open(os.path.join(image_path, file_list[current_frame]))
        cur_image = img.convert('RGB')
        cur_image = np.array(cur_image).astype(np.float32) / 255.0
        cur_image = torch.from_numpy(cur_image)[None,]
        print(f'[Debug] CR Load Flow Frames: Current image {file_list[current_frame]}')
        if current_frame == 0 and skip_start_frames == 0:
            img = Image.open(os.path.join(image_path, file_list[current_frame]))
            pre_image = img.convert('RGB')
            pre_image = np.array(pre_image).astype(np.float32) / 255.0
            pre_image = torch.from_numpy(pre_image)[None,]
            print(f'[Debug] CR Load Flow Frames: Previous image {file_list[current_frame]}')
        else:
            img = Image.open(os.path.join(image_path, file_list[current_frame - 1]))
            pre_image = img.convert('RGB')
            pre_image = np.array(pre_image).astype(np.float32) / 255.0
            pre_image = torch.from_numpy(pre_image)[None,]
            print(f'[Debug] CR Load Flow Frames: Previous image {file_list[current_frame - 1]}')
        return (cur_image, pre_image, current_frame, show_help)
```