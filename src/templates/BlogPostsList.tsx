import { graphql, PageProps } from 'gatsby';
import React, { FC } from 'react';
import readingTime from 'reading-time';

import { PostItemProps } from '../components/blog/interfaces/PostItemProps';
import { PostListItem } from '../components/blog/PostListItem';

const BlogPostsList: FC<PageProps> = (props: PageProps) => {
  const { data } = props;
  const postList = data.allMdx.edges.map(({ node: { slug, frontmatter, body } }) => ({
    slug,
    stats: readingTime(body),
    date: frontmatter.date,
    description: frontmatter.description,
    tags: frontmatter.tags,
    title: frontmatter.title,
    coverImgSrc: frontmatter.coverImg.childImageSharp.fluid.src,
  }));
  return (
    <div>
      {postList.map((item: PostItemProps) => (
        <PostListItem {...item} />
      ))}
    </div>
  );
};

export const query = graphql`
  query BlogPostQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
      edges {
        node {
          slug
          body
          frontmatter {
            title
            description
            date
            tags
            coverImg {
              childImageSharp {
                fluid(maxWidth: 1024) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default BlogPostsList;