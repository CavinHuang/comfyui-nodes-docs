# Documentation
- Class name: SaveImageToLocal
- Category: ♾️Mixlab/Image
- Output node: True
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

“SaveImageToLocal”节点旨在将图像数据保存到本地文件系统。它提供了一个简单的机制来持久化图像，确保它们被存储在指定的输出目录中。这个节点在需要在计算环境之外进行图像可视化或进一步处理的场景中特别有用。

# Input types
## Required
- images
    - “images”参数对于节点的操作至关重要，因为它代表了要保存的原始图像数据。其成功执行取决于所提供图像数据的正确格式和完整性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- file_path
    - “file_path”参数指示图像将存储在本地系统的位置。它对于指导节点的输出和系统地组织保存的文件至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt
    - “prompt”参数虽然是可选的，但可以通过在图像元数据中嵌入描述性文本来为保存的图像添加上下文。这对于分类和搜索图像集合特别有用。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - “extra_pnginfo”参数允许在每个保存的图像中包含额外的元数据，增强了图像的描述能力，并促进了更复杂的搜索或组织方案。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, str]

# Output types

# Usage tips
- Infra type: CPU

# Source code
```
class SaveImageToLocal:

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = 'output'
        self.compress_level = 4

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'file_path': ('STRING', {'multiline': True, 'default': '', 'dynamicPrompts': False})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    FUNCTION = 'save_images'
    OUTPUT_NODE = True
    CATEGORY = '♾️Mixlab/Image'

    def save_images(self, images, file_path, prompt=None, extra_pnginfo=None):
        filename_prefix = os.path.basename(file_path)
        if file_path == '':
            filename_prefix = 'ComfyUI'
        (filename_prefix, _) = os.path.splitext(filename_prefix)
        (_, extension) = os.path.splitext(file_path)
        if extension:
            file_path = os.path.dirname(file_path)
        (full_output_folder, filename, counter, subfolder, filename_prefix) = folder_paths.get_save_image_path(filename_prefix, self.output_dir, images[0].shape[1], images[0].shape[0])
        if not os.path.exists(file_path):
            os.makedirs(file_path)
            print('目录已创建')
        else:
            print('目录已存在')
        if file_path == '':
            files = glob.glob(full_output_folder + '/*')
        else:
            files = glob.glob(file_path + '/*')
        file_count = len(files)
        counter += file_count
        print('统计文件数量', file_count, counter)
        results = list()
        for image in images:
            i = 255.0 * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            metadata = None
            if not args.disable_metadata:
                metadata = PngInfo()
                if prompt is not None:
                    metadata.add_text('prompt', json.dumps(prompt))
                if extra_pnginfo is not None:
                    for x in extra_pnginfo:
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))
            file = f'{filename}_{counter:05}_.png'
            if file_path == '':
                fp = os.path.join(full_output_folder, file)
                if os.path.exists(fp):
                    file = f'{filename}_{counter:05}_{generate_random_string(8)}.png'
                    fp = os.path.join(full_output_folder, file)
                img.save(fp, pnginfo=metadata, compress_level=self.compress_level)
                results.append({'filename': file, 'subfolder': subfolder, 'type': self.type})
            else:
                fp = os.path.join(file_path, file)
                if os.path.exists(fp):
                    file = f'{filename}_{counter:05}_{generate_random_string(8)}.png'
                    fp = os.path.join(file_path, file)
                img.save(os.path.join(file_path, file), pnginfo=metadata, compress_level=self.compress_level)
                results.append({'filename': file, 'subfolder': file_path, 'type': self.type})
            counter += 1
        return ()
```