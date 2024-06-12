# Documentation
- Class name: CR_LoadGIFAsList
- Category: Comfyroll/List/IO
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_LoadGIFAsList 是一个用于加载和处理 GIF 文件的节点，它能够提取单独的帧及其对应的遮罩。该节点能够通过指定起始帧和最大帧数来处理一系列 GIF 文件。在 Comfyroll Studio 环境中，这个节点对于准备进一步操作和分析的 GIF 数据至关重要。

# Input types
## Required
- input_folder
    - input_folder 参数指定包含要加载的 GIF 文件的目录。对于节点来说，定位和访问正确的 GIF 文件以进行处理至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- gif_filename
    - gif_filename 参数定义了要加载的 GIF 文件的名称。它在众多选项中识别特定 GIF 文件中起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- start_frame
    - start_frame 参数指示节点应从哪个帧号开始加载 GIF 帧。它在控制帧提取过程的起始点上具有重要意义。
    - Comfy dtype: INT
    - Python dtype: int
- max_frames
    - max_frames 参数设置从 GIF 中提取的最大帧数。它在限制帧提取的范围和管理资源使用方面很重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- input_path
    - 可选的 input_path 参数允许指定 GIF 文件的自定义路径，覆盖默认的目录结构。它为特定用例提供了文件位置的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - IMAGE 输出包含从 GIF 文件加载的帧，以便在 Comfyroll Studio 工作流中进行进一步处理或可视化。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- MASK
    - MASK 输出提供与每一帧对应的遮罩，可用于需要透明度信息的分割或其他图像处理任务。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]
- show_help
    - show_help 输出提供了一个链接到文档，以便在使用节点时获得进一步的帮助和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_LoadGIFAsList:

    @classmethod
    def INPUT_TYPES(cls):
        input_dir = folder_paths.input_directory
        image_folder = [name for name in os.listdir(input_dir) if os.path.isdir(os.path.join(input_dir, name))]
        return {'required': {'input_folder': (sorted(image_folder),), 'gif_filename': ('STRING', {'multiline': False, 'default': 'text'}), 'start_frame': ('INT', {'default': 0, 'min': 0, 'max': 99999}), 'max_frames': ('INT', {'default': 1, 'min': 1, 'max': 99999})}, 'optional': {'input_path': ('STRING', {'default': '', 'multiline': False})}}
    RETURN_TYPES = ('IMAGE', 'MASK', 'STRING')
    RETURN_NAMES = ('IMAGE', 'MASK', 'show_help')
    OUTPUT_IS_LIST = (True, True, False)
    FUNCTION = 'load_gif'
    CATEGORY = icons.get('Comfyroll/List/IO')

    def load_gif(self, input_folder, gif_filename, start_frame, max_frames, input_path=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-load-gif-images'
        if input_path != '' and input_path is not None:
            if not os.path.exists(input_path):
                print(f'[Warning] CR Image List: The input_path `{input_path}` does not exist')
                return ('',)
            in_path = input_path
        else:
            input_dir = folder_paths.input_directory
            in_path = os.path.join(input_dir, input_folder)
        gif_file_path = os.path.join(in_path, gif_filename)
        frames_list = []
        masks_list = []
        try:
            with Image.open(gif_file_path) as gif_image:
                for (i, frame) in enumerate(ImageSequence.Iterator(gif_image)):
                    if i < start_frame:
                        continue
                    if max_frames is not None and i >= start_frame + max_frames:
                        break
                    img = frame.copy()
                    (width, height) = img.size
                    frames_list.append(pil2tensor(img.convert('RGB')))
                    tensor_img = pil2tensor(img)
                    masks_list.append(tensor2rgba(tensor_img)[:, :, :, 0])
            images = torch.cat(frames_list, dim=0)
            images_out = [images[i:i + 1, ...] for i in range(images.shape[0])]
            masks = torch.cat(masks_list, dim=0)
            masks_out = [masks[i:i + 1, ...] for i in range(masks.shape[0])]
            return (images_out, masks_out, show_help)
        except Exception as e:
            print(f'Error: {e}')
            return (None, None, show_help)
```