# Documentation
- Class name: SaveImagesMikeyML
- Category: Mikey/Image
- Output node: True
- Repo Ref: https://github.com/bash-j/mikey_nodes

SaveImagesMikeyML 节点负责将图像保存到指定目录，并具有可定制的命名方案。它允许包含各种元数据元素，如时间戳、计数器值和额外文本。该节点确保文件名经过净化并遵守预定义的长度限制。

# Input types
## Required
- images
    - images 参数至关重要，因为它定义了需要保存的实际图像数据。它通过确定将哪些内容写入输出文件来影响节点的执行。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
## Optional
- sub_directory
    - sub_directory 参数指定了输出目录中的一个子目录，图像将被保存在这个子目录中。这对于将保存的文件组织到特定类别或组中非常重要。
    - Comfy dtype: STRING
    - Python dtype: str
- filename_text_1
    - filename_text_1 参数允许用户定义一段文本，该文本将包含在保存图像的文件名中。它有助于定制文件名。
    - Comfy dtype: STRING
    - Python dtype: str
- filename_text_2
    - 与 filename_text_1 类似，此参数向文件名中添加了另一个可定制的文本元素。它增强了命名约定的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- filename_text_3
    - 这是文件名的第三个可定制文本参数，为用户提供了更多选项，以便在保存的图像文件名中包含特定信息。
    - Comfy dtype: STRING
    - Python dtype: str
- filename_separator
    - filename_separator 参数确定用于分隔文件名中不同文本元素的字符或字符串。它对定义文件名的结构至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- timestamp
    - timestamp 参数指示是否在文件名中包含时间戳。它在版本控制和跟踪图像保存的时间方面发挥作用。
    - Comfy dtype: COMBO['true', 'false']
    - Python dtype: str
- counter_type
    - counter_type 参数指定在文件名中递增计数器的方法，可以基于文件夹结构或文件名模式。对于确保文件名的唯一性很重要。
    - Comfy dtype: COMBO['none', 'folder', 'filename']
    - Python dtype: str
- filename_text_1_pos
    - filename_text_1_pos 参数设置第一个文本元素在文件名中的位置。它对于控制文件名中元素的顺序很重要。
    - Comfy dtype: INT
    - Python dtype: int
- filename_text_2_pos
    - 此参数确定第二个文本元素在文件名中的位置，允许用户根据他们的喜好排列文本元素。
    - Comfy dtype: INT
    - Python dtype: int
- filename_text_3_pos
    - filename_text_3_pos 参数用于设置第三个文本元素在文件名中的位置，有助于整体组织文件名。
    - Comfy dtype: INT
    - Python dtype: int
- timestamp_pos
    - timestamp_pos 参数定义了时间戳在文件名中的位置。它影响文件名组件的整体排列。
    - Comfy dtype: INT
    - Python dtype: int
- timestamp_type
    - timestamp_type 参数规定了文件名中使用的时间戳的来源，可以基于作业的开始时间或保存图像的时间。
    - Comfy dtype: COMBO['job', 'save_time']
    - Python dtype: str
- counter_pos
    - counter_pos 参数指定计数器在文件名中出现的位置。对于维护保存文件的顺序至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- extra_metadata
    - extra_metadata 参数允许在保存的图像的 PNG 信息中包含额外的元数据。它提供了一种在图像数据旁边存储额外信息的方法。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt
    - prompt 参数用于将上下文信息注入到文件名生成过程中。它可以根据提供的内容影响文件名的构建方式。
    - Comfy dtype: PROMPT
    - Python dtype: Dict[str, Any]
- extra_pnginfo
    - extra_pnginfo 参数允许将 PNG 元数据中的额外信息包含在文件名中。这对于嵌入以后可以检索的附加细节很有用。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, Any]

# Output types
- ui
    - ui 参数用作向用户呈现结果的界面。它通常包含一个字典列表，每个字典代表一个保存的图像，带有其文件名和子文件夹信息。
    - Comfy dtype: COMBO[Dict[str, List[Dict[str, str]]]]
    - Python dtype: Dict[str, List[Dict[str, str]]]
- images
    - ui 输出中的 images 参数包含有关每个保存的图像的详细信息，包括文件名和保存它的子目录。
    - Comfy dtype: COMBO[List[Dict[str, str]]]
    - Python dtype: List[Dict[str, str]]

# Usage tips
- Infra type: CPU

# Source code
```
class SaveImagesMikeyML:

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = 'output'

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'sub_directory': ('STRING', {'default': ''}), 'filename_text_1': ('STRING', {'default': 'Filename Text 1'}), 'filename_text_2': ('STRING', {'default': 'Filename Text 2'}), 'filename_text_3': ('STRING', {'default': 'Filename Text 3'}), 'filename_separator': ('STRING', {'default': '_'}), 'timestamp': (['true', 'false'], {'default': 'true'}), 'counter_type': (['none', 'folder', 'filename'], {'default': 'folder'}), 'filename_text_1_pos': ('INT', {'default': 0}), 'filename_text_2_pos': ('INT', {'default': 2}), 'filename_text_3_pos': ('INT', {'default': 4}), 'timestamp_pos': ('INT', {'default': 1}), 'timestamp_type': (['job', 'save_time'], {'default': 'save_time'}), 'counter_pos': ('INT', {'default': 3}), 'extra_metadata': ('STRING', {'default': 'Extra Metadata'})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    FUNCTION = 'save_images'
    OUTPUT_NODE = True
    CATEGORY = 'Mikey/Image'

    def _prepare_filename_texts(self, filename_text_1, filename_text_2, filename_text_3, extra_pnginfo, prompt):
        filename_texts = [filename_text_1, filename_text_2, filename_text_3]
        default_texts = ['Filename Text 1', 'Filename Text 2', 'Filename Text 3']
        for (i, text) in enumerate(filename_texts):
            if text == default_texts[i]:
                filename_texts[i] = ''
            filename_texts[i] = search_and_replace(text, extra_pnginfo, prompt)
            filename_texts[i] = re.sub('[<>:"/\\\\|?*]', '', filename_texts[i])
            filename_texts[i] = filename_texts[i].encode('ascii', 'ignore').decode('ascii')
        total_length = len(filename_texts[0]) + len(filename_texts[1]) + len(filename_texts[2]) + 5 + 5 + 12
        if total_length > 120:
            longest_text = max(filename_texts, key=len)
            longest_text_idx = filename_texts.index(longest_text)
            text_length_without_longest = total_length - len(longest_text)
            filename_texts[longest_text_idx] = longest_text[0:120 - text_length_without_longest]
        return filename_texts

    def _get_initial_counter(self, files, full_output_folder, counter_type, filename_separator, counter_pos, filename_texts):
        counter = 1
        if counter_type == 'folder':
            if files:
                for f in files:
                    if filename_separator in f:
                        try:
                            counter = max(counter, int(f.split(filename_separator)[counter_pos]) + 1)
                        except:
                            counter = 1
                            break
            else:
                counter = 1
        elif counter_type == 'filename':
            for f in files:
                f_split = f.split(filename_separator)
                f_split = [x.replace('.png', '') for x in f_split]
                matched_texts = all((filename_texts[i] == f_split[i] for i in range(3) if filename_texts[i]))
                if matched_texts:
                    counter += 1
        return counter

    def _get_next_counter(self, full_output_folder, filename_base, counter):
        """Checks for the next available counter value."""
        while True:
            current_filename = filename_base.format(counter=f'{counter:05}')
            if not os.path.exists(os.path.join(full_output_folder, f'{current_filename}.png')):
                return counter
            counter += 1

    def save_images(self, images, sub_directory, filename_text_1, filename_text_2, filename_text_3, filename_separator, timestamp, counter_type, filename_text_1_pos, filename_text_2_pos, filename_text_3_pos, timestamp_pos, timestamp_type, counter_pos, extra_metadata, prompt=None, extra_pnginfo=None):
        positions = [filename_text_1_pos, filename_text_2_pos, filename_text_3_pos, timestamp_pos, counter_pos]
        if len(positions) != len(set(positions)):
            raise ValueError('Duplicate position numbers detected. Please ensure all position numbers are unique.')
        sub_directory = search_and_replace(sub_directory, extra_pnginfo, prompt)
        sub_directory = re.sub('[<>:"|?*]', '', sub_directory)
        sub_directory = sub_directory.encode('ascii', 'ignore').decode('ascii')
        full_output_folder = os.path.join(self.output_dir, sub_directory)
        os.makedirs(full_output_folder, exist_ok=True)
        filename_texts = self._prepare_filename_texts(filename_text_1, filename_text_2, filename_text_3, extra_pnginfo, prompt)
        if timestamp == 'true':
            ts = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
        else:
            ts = ''
        elements = {filename_text_1_pos: filename_texts[0], filename_text_2_pos: filename_texts[1], filename_text_3_pos: filename_texts[2], timestamp_pos: ts, counter_pos: 'counter' if counter_type != 'none' else None}
        sorted_elements = [elem for (_, elem) in sorted(elements.items()) if elem]
        filename_base = filename_separator.join(sorted_elements).replace('counter', '{counter}')
        files = os.listdir(full_output_folder)
        if counter_type != 'none':
            counter = self._get_initial_counter(files, full_output_folder, counter_type, filename_separator, counter_pos, filename_texts)
        else:
            counter = 0
        results = list()
        for (ix, image) in enumerate(images):
            i = 255.0 * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            metadata = PngInfo()
            if prompt is not None:
                metadata.add_text('prompt', json.dumps(prompt))
            if extra_pnginfo is not None:
                for x in extra_pnginfo:
                    if x == 'parameters':
                        text = extra_pnginfo[x].encode('utf-8').decode('utf-8')
                        metadata.add_text(x, text)
                    elif x == 'workflow':
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))
                    elif x == 'prompt':
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))
                    else:
                        metadata.add_text(x, json.dumps(extra_pnginfo[x], ensure_ascii=False))
            if extra_metadata:
                metadata.add_text('extra_metadata', extra_metadata)
            if counter_type != 'none':
                counter = self._get_next_counter(full_output_folder, filename_base, counter)
                current_filename = filename_base.format(counter=f'{counter:05}')
            else:
                current_filename = filename_base
            if timestamp_type == 'save_time' and timestamp == 'true':
                current_timestamp = datetime.datetime.now().strftime('%y%m%d%H%M%S')
                current_filename = current_filename.replace(ts, current_timestamp)
                ts = current_timestamp
            if ix > 0 and counter_type == 'none':
                current_filename = current_filename.replace(ts, ts + f'_{ix:02}')
            img.save(os.path.join(full_output_folder, f'{current_filename}.png'), pnginfo=metadata, compress_level=4)
            results.append({'filename': f'{current_filename}.png', 'subfolder': sub_directory, 'type': self.type})
            if counter_type != 'none':
                counter += 1
        return {'ui': {'images': results}}
```