import { BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { validateOrReject } from 'class-validator';


// Extends the BaseEntity class to include validators before Insertion and update
// to ensure data consistency

class ExtendedBaseEntity extends BaseEntity {
  @BeforeInsert()
  async validateOnInsert() {
    await validateOrReject(this);
  }

  @BeforeUpdate()
  async validateOnUpdate() {
    await validateOrReject(this, { skipMissingProperties: true });
  }
}

export default ExtendedBaseEntity;