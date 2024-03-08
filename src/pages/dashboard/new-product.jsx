import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { generateSlug, generateUniqueSKU } from '@/utils';
import useNewProduct from '@/hooks/useNewProduct';

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

export function NewProduct() {
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState([]);
  const [thumbnailFileList, setThumbnailFileList] = useState([]);
  const [slugValue, setSlugValue] = useState('');
  const { mutate, isLoading } = useNewProduct();

  const handleImageChange = ({ fileList }) => {
    setImageFileList(fileList);
  };

  const handleThumbnailChange = ({ fileList }) => {
    setThumbnailFileList(fileList);
  };

  const sku = generateUniqueSKU();

  const handleFormSubmit = (values) => {
    const formData = new FormData();
    formData.append('slug', slugValue);
    formData.append('sku', sku);
    formData.append('name', values.name);
    formData.append('desc', values.desc);
    formData.append('currency', values.currency);
    formData.append('category', values.category);
    formData.append('weight', values.weight);
    formData.append('size', values.size);
    formData.append('color', values.color);
    formData.append('thumbnail')

  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = generateSlug(name);
    setSlugValue(slug);
    form.setFieldsValue({ slug });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="flex justify-between items-center mb-8 p-6">
          <Typography variant="h6" color="white">
            ADD PRODUCT
          </Typography>
        </CardHeader>
        <CardBody className="overflow-hidden px-0 pt-0 pb-2">
          <Form {...formItemLayout} onFinish={handleFormSubmit} className="flex gap-6 flex-col p-6" variant="filled" style={{ maxWidth: 700 }}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter product name!' }]}
              help="Enter the name of the product"
            >
              <Input onChange={handleNameChange} className="border border-gray-300" />
            </Form.Item>

            <Form.Item
              label="SKU"
              name="sku"
              rules={[{ required: true, message: 'Please enter sku!' }]}
              help="Enter the stock keeping unit (SKU) for the product"
            >
              <Input className="border border-gray-300" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="desc"
              rules={[{ required: true, message: 'Please input description!' }]}
              help="Enter the description of the product"
            >
              <TextArea className="border border-gray-300" />
            </Form.Item>

            <Form.Item
              label="Currency"
              name="currency"
              rules={[{ required: true, message: 'Please select currency!' }]}
              help="Select the currency for pricing"
            >
              <Select className="border border-gray-300 rounded-md">
                <Option value="ZMW">ZMW</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: 'Please select category!' }]}
              help="Select the category for product"
            >
              <Select className="border border-gray-300 rounded-md" />
            </Form.Item>

            <Form.Item
              label="Weight"
              name="weight"
              rules={[{ required: true, message: 'Please input weight!' }]}
              help="Enter the weight of the product"
            >
              <InputNumber suffix="Kg" style={{ width: '100%' }} className="border border-gray-300 rounded-md" />
            </Form.Item>

            <Form.Item
              label="Size"
              name="size"
              rules={[{ required: true, message: 'Please select size!' }]}
              help="Select the size of the product"
            >
              <Select className="border border-gray-300 rounded-md">
                <Option value="small">Small</Option>
                <Option value="medium">Medium</Option>
                <Option value="large">Large</Option>
                <Option value="extra-large">Extra Large</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Color"
              name="color"
              rules={[{ required: true, message: 'Please enter color!' }]}
              help="Enter the color of the product"
            >
              <Input className="border border-gray-300 rounded-md" />
            </Form.Item>

            <Form.Item
              label="Images"
              name="images"
              rules={[{ required: true, message: 'Please upload images!' }]}
              help="Upload images for the product"
            >
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  fileList={imageFileList}
                  onChange={handleImageChange}
                  maxCount={5}
                >
                  {imageFileList.length < 5 && '+ Upload'}
                </Upload>
              </ImgCrop>
            </Form.Item>

            <Form.Item
              label="Thumbnail"
              name="thumbnail"
              rules={[{ required: true, message: 'Please upload thumbnail!' }]}
              help="Upload a thumbnail image for the product"
            >
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  fileList={thumbnailFileList}
                  onChange={handleThumbnailChange}
                  maxCount={1}
                >
                  {thumbnailFileList.length < 1 && '+ Upload'}
                </Upload>
              </ImgCrop>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button htmlType="submit" style={{ width: 400 }} className="bg-gray-700 text-white">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </CardBody>
      </Card>

    </div>

  );
}

export default NewProduct;
