# Documentation
- Class name: PreviewBridge
- Category: ImpactPack/Util
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

PreviewBridge节点旨在处理和管理图像数据，提供输入图像与后续处理阶段之间的桥梁。它负责加载、转换和缓存图像，以优化工作流程并确保系统内视觉数据的有效处理。

# Input types
## Required
- images
    - ‘images’参数对于节点至关重要，因为它代表了需要处理的输入图像数据。它在节点的执行中扮演着关键角色，因为它直接影响输出和随后的图像操作。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- unique_id
    - ‘unique_id’参数对于节点的功能至关重要，因为它唯一地标识节点处理的每个图像或数据集。它确保节点能够准确跟踪和管图像，这对于节点的运行和结果完整性至关重要。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str
## Optional
- image
    - ‘image’参数作为节点操作中特定图像的可选标识符。它可以用来根据提供的标识符引用或检索特定的图像数据，因此在定制节点行为中扮演着重要角色。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- ui
    - ‘ui’输出参数非常重要，因为它包含与节点操作相关的用户界面元素。它通常包括可以显示或用于系统UI内进一步交互的图像数据。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]
- result
    - ‘result’输出参数封装了处理后的图像数据和相应的掩码。它是节点功能的关键组成部分，因为它提供了可以用于下游任务或分析的最终输出。
    - Comfy dtype: TUPLE[torch.Tensor, torch.Tensor]
    - Python dtype: Tuple[torch.Tensor, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class PreviewBridge:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'image': ('STRING', {'default': ''})}, 'hidden': {'unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('IMAGE', 'MASK')
    FUNCTION = 'doit'
    OUTPUT_NODE = True
    CATEGORY = 'ImpactPack/Util'

    def __init__(self):
        super().__init__()
        self.output_dir = folder_paths.get_temp_directory()
        self.type = 'temp'
        self.prev_hash = None

    @staticmethod
    def load_image(pb_id):
        is_fail = False
        if pb_id not in core.preview_bridge_image_id_map:
            is_fail = True
        (image_path, ui_item) = core.preview_bridge_image_id_map[pb_id]
        if not os.path.isfile(image_path):
            is_fail = True
        if not is_fail:
            i = Image.open(image_path)
            i = ImageOps.exif_transpose(i)
            image = i.convert('RGB')
            image = np.array(image).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]
            if 'A' in i.getbands():
                mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
                mask = 1.0 - torch.from_numpy(mask)
            else:
                mask = torch.zeros((64, 64), dtype=torch.float32, device='cpu')
        else:
            image = empty_pil_tensor()
            mask = torch.zeros((64, 64), dtype=torch.float32, device='cpu')
            ui_item = {'filename': 'empty.png', 'subfolder': '', 'type': 'temp'}
        return (image, mask.unsqueeze(0), ui_item)

    def doit(self, images, image, unique_id):
        need_refresh = False
        if unique_id not in core.preview_bridge_cache:
            need_refresh = True
        elif core.preview_bridge_cache[unique_id][0] is not images:
            need_refresh = True
        if not need_refresh:
            (pixels, mask, path_item) = PreviewBridge.load_image(image)
            image = [path_item]
        else:
            res = nodes.PreviewImage().save_images(images, filename_prefix='PreviewBridge/PB-')
            image2 = res['ui']['images']
            pixels = images
            mask = torch.zeros((64, 64), dtype=torch.float32, device='cpu')
            path = os.path.join(folder_paths.get_temp_directory(), 'PreviewBridge', image2[0]['filename'])
            core.set_previewbridge_image(unique_id, path, image2[0])
            core.preview_bridge_image_id_map[image] = (path, image2[0])
            core.preview_bridge_image_name_map[unique_id, path] = (image, image2[0])
            core.preview_bridge_cache[unique_id] = (images, image2)
            image = image2
        return {'ui': {'images': image}, 'result': (pixels, mask)}
```